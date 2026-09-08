import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { user, checkSession } from "./auth.js"

function ProtectedRoute(props) {
  const navigate = useNavigate();

  onMount(async () => {
    await checkSession();
  
    if (!user()) {
      navigate('/login', { replace: true }); 
    }
  });

  return props.children;
}

export default ProtectedRoute;