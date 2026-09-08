import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";
import { user , checkSession } from "./auth.js"


function PublicOnlyRoute(props) {
  const navigate = useNavigate();

  onMount(async () => {
    await checkSession();
    
    if (user()) {
      navigate('/tasklist', { replace: true }); 
    }
  });

  return props.children;
}

export default PublicOnlyRoute;
