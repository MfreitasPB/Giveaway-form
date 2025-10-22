    // simple client side validation and UX
    const form = document.getElementById('prospect-form');
    const errBox = document.getElementById('form-error');
    const okBox  = document.getElementById('form-success');

    function show(el){el.style.display='block'}
    function hide(el){el.style.display='none'}

    function setError(id, showIt){
      const el = document.getElementById(id);
      if(!el) return;
      if(showIt) el.style.display='block'; else el.style.display='none';
    }

    function isEmail(value){
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
    }

    form.addEventListener('submit', function(e){
      hide(errBox);
      hide(okBox);

      // honeypot
      const hp = form.querySelector('input[name="website"]');
      if(hp && hp.value){
        e.preventDefault();
        errBox.textContent = "Submission blocked, please contact support.";
        show(errBox);
        return;
      }

      // fields
      const first = document.getElementById('first-name');
      const last  = document.getElementById('last-name');
      const email = document.getElementById('email');
      const consent = document.getElementById('consent');
      const subYes = document.getElementById('sub-yes');
      const subNo  = document.getElementById('sub-no');

      let hasError = false;

      if(!first.value.trim()){ setError('err-first-name', true); hasError = true; } else { setError('err-first-name', false); }
      if(!last.value.trim()){ setError('err-last-name', true); hasError = true; } else { setError('err-last-name', false); }
      if(!isEmail(email.value)){ setError('err-email', true); hasError = true; } else { setError('err-email', false); }
      if(!subYes.checked && !subNo.checked){ setError('err-sub', true); hasError = true; } else { setError('err-sub', false); }
      if(!consent.checked){ setError('err-consent', true); hasError = true; } else { setError('err-consent', false); }

      if(hasError){
        e.preventDefault();
        errBox.textContent = "Please fix the highlighted fields and try again.";
        show(errBox);
        return;
      }

      // optional friendly notice before POST happens
      okBox.textContent = "Submitting, thank you!";
      show(okBox);
    });