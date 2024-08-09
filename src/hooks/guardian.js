(
    () => {
    
      const user = localStorage.getItem("userOnline");
    
      if(!user) {
        window.location.href = "index.html";
      }
    }
    )()