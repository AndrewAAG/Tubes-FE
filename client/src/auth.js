import { createSignal } from 'solid-js';

export const [user, setUser] = createSignal(null);

// Cek ke backend apakah session masih aktif
export const checkSession = async () => {
  try {
    const response = await fetch('http://localhost:8080/auth', { 
      method: 'GET',
      credentials: 'include' 
    });

    const data = await response.json();

    if (data.success) {
      setUser(data.userData); 
    } else {
      setUser(null);
    }
  } catch (e) {
    console.error(e);
  }
};
