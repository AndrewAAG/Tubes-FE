const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cookieParser = require("cookie-parser");

const dbPath = path.join(__dirname, "db.json");
const sessionsPath = path.join(__dirname, "sessions.json");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getUserId(sessionId) {
  const sessionsData = readJson(sessionsPath);

  for (let i = 0; i < sessionsData.length; i++) {
    if (sessionsData[i].sessionId === sessionId) {
      return sessionsData[i].userId;
    }
  }
}

app.get("/auth", (req, res) => {
  const cookieSessionId = req.cookies.session_id;

  if (!cookieSessionId) {
    return res.json({ success: false });
  }

  const userId = getUserId(cookieSessionId);

  let usersData = readJson(dbPath);
  usersData = usersData.users.filter((user) => user.id === userId);

  res.json({ success: true, userData: usersData[0] });
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const jsonData = readJson(dbPath);
  const userData = jsonData.users;

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].email === email && userData[i].password === password) {
      const sessionId = crypto.randomUUID();

      const sessionsData = readJson(sessionsPath);

      sessionsData.push({
        sessionId,
        userId: userData[i].id,
      });

      writeJson(sessionsPath, sessionsData);

      res.cookie("session_id", sessionId, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.json({
        success: true,
      });
    }
  }

  return res.json({
    success: false,
  });
});

app.post("/register", (req, res) => {
  const { fullname, email, password } = req.body;

  const jsonData = readJson(dbPath);

  const userId = jsonData.users.length + 1;

  jsonData.users.push({
    id: userId,
    fullname: fullname,
    email: email,
    password: password,
  });

  writeJson(dbPath, jsonData);

  const sessionId = crypto.randomUUID();

  const sessionsData = readJson(sessionsPath);

  sessionsData.push({
    sessionId,
    userId: userId,
  });

  writeJson(sessionsPath, sessionsData);

  res.cookie("session_id", sessionId, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
  });
});

app.get("/taskdata", (req, res) => {
  const cookieSessionId = req.cookies.session_id;

  const userId = getUserId(cookieSessionId);

  const jsonData = readJson(dbPath);
  const taskData = jsonData.tasks;

  let taskResult = [];

  for (let i = 0; i < taskData.length; i++) {
    if (taskData[i].userId === userId) {
      taskResult.push(taskData[i]);
    }
  }

  res.json({
    tasks: taskResult,
  });
});

app.post("/logout", (req, res) => {
  const cookieSessionId = req.cookies.session_id;

  let sessionsData = readJson(sessionsPath);

  sessionsData = sessionsData.filter((session) => session.sessionId !== cookieSessionId);

  writeJson(sessionsPath, sessionsData);

  res.clearCookie("session_id", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({
    success: true,
  });
});

app.post("/addtask", (req, res) => {
  const { title, description, dueDate, tag, priority, status } = req.body;
  const cookieSessionId = req.cookies.session_id;
  const userId = getUserId(cookieSessionId);

  let dbData = readJson(dbPath);

  const newTask = {
    id: dbData.tasks[dbData.tasks.length - 1].id + 1,
    userId: userId,
    title: title,
    description: description,
    status: status,
    tag: tag.toLowerCase().trim(),
    priority: priority,
    date: dueDate,
  };

  dbData.tasks.push(newTask);

  writeJson(dbPath, dbData);

  return res.json({
    success: true,
    task: newTask
  });
});

app.put("/edittask/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description, dueDate, tag, priority, status } = req.body;

  let dbData = readJson(dbPath);
  let tasksData = dbData.tasks;
  const taskIndex = tasksData.findIndex((t) => t.id === taskId);

  dbData.tasks[taskIndex] = {
    ...dbData.tasks[taskIndex], // id dan userId jangan diubah
    title: title,
    description: description,
    status: status,
    tag: tag.toLowerCase().trim(),
    priority: priority,
    date: dueDate,
  };


  writeJson(dbPath, dbData);


  return res.json({success: true});
});

app.delete("/delete/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const cookieSessionId = req.cookies.session_id;

  const userId = getUserId(cookieSessionId);

  let dbData = readJson(dbPath);
  let tasksData = dbData.tasks;
  tasksData = tasksData.filter((task) => task.id !== taskId || task.userId !== userId);

  dbData.tasks = tasksData;

  writeJson(dbPath, dbData);

  res.json({
    success: true,
  });
});

app.listen(8080, (err) => {
  if (err) console.log(err.message);
});
