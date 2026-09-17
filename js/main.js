/* =========================================================
   main.js — Interatividade, Responsividade e Sistema de Login
   Pé na Estrada — Viagens autorais pelo Brasil
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     1. BANCO DE DADOS LOCAL E ESTADO DE AUTENTICAÇÃO
     --------------------------------------------------------- */

  var STORAGE_USERS_KEY = "penaestrada_users";
  var STORAGE_SESSION_KEY = "penaestrada_current_user";

  // Usuários padrão pré-cadastrados para teste imediato
  var DEFAULT_USERS = [
    {
      nome: "Mariana Silva",
      email: "mariana@exemplo.com",
      senha: "senha123",
      favoritos: ["noronha", "chapada"]
    },
    {
      nome: "Roberto Mendes",
      email: "roberto@exemplo.com",
      senha: "senha123",
      favoritos: ["jeri"]
    }
  ];

  function getUsers() {
    try {
      var stored = localStorage.getItem(STORAGE_USERS_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
        return DEFAULT_USERS;
      }
      return JSON.parse(stored);
    } catch (e) {
      return DEFAULT_USERS;
    }
  }

  function saveUsers(users) {
    try {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("Erro ao salvar usuários no localStorage:", e);
    }
  }

  function getCurrentUser() {
    try {
      var session = localStorage.getItem(STORAGE_SESSION_KEY) || sessionStorage.getItem(STORAGE_SESSION_KEY);
      if (!session) return null;
      var user = JSON.parse(session);
      var users = getUsers();
      var found = users.find(function (u) {
        return u.email.toLowerCase() === user.email.toLowerCase();
      });
      return found || user;
    } catch (e) {
      return null;
    }
  }

  function setCurrentUser(user, remember) {
    try {
      var json = JSON.stringify(user);
      if (remember) {
        localStorage.setItem(STORAGE_SESSION_KEY, json);
        sessionStorage.removeItem(STORAGE_SESSION_KEY);
      } else {
        sessionStorage.setItem(STORAGE_SESSION_KEY, json);
        localStorage.removeItem(STORAGE_SESSION_KEY);
      }
    } catch (e) {
      console.error("Erro ao salvar sessão:", e);
    }
  }

  function clearCurrentUser() {
    try {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      sessionStorage.removeItem(STORAGE_SESSION_KEY);
    } catch (e) {}
  }

  function getInitials(name) {
    if (!name) return "PE";
    var parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /* ---------------------------------------------------------
     2. SISTEMA DE NOTIFICAÇÕES TOAST
     --------------------------------------------------------- */

  function showToast(message, type, title) {
    var container = document.getElementById("toastContainer");
    if (!container) return;

    type = type || "info";
    title = title || (type === "success" ? "Sucesso" : type === "error" ? "Atenção" : "Pé na Estrada");

    var toast = document.createElement("div");
    toast.className = "toast toast--" + type;
    toast.setAttribute("role", "status");

    var iconSvg = "";
    if (type === "success") {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
    } else if (type === "error") {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>';
    } else {
      iconSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML =
      '<div class="toast__icon">' + iconSvg + "</div>" +
      '<div class="toast__body">' +
      '<strong class="toast__title">' + escapeHtml(title) + "</strong>" +
      '<span class="toast__msg">' + escapeHtml(message) + "</span>" +
      "</div>" +
      '<button class="toast__close" type="button" aria-label="Fechar notificação">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      "</button>";

    container.appendChild(toast);

    function closeToast() {
      toast.classList.add("is-hiding");
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }

    var closeBtn = toast.querySelector(".toast__close");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeToast);
    }

    setTimeout(closeToast, 4500);
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ---------------------------------------------------------
     3. CABEÇALHO, MENU MOBILE (DRAWER) E NAVEGAÇÃO
     --------------------------------------------------------- */

  var siteHeader = document.getElementById("siteHeader");
  var navToggle = document.getElementById("navToggle");
  var navDrawer = document.getElementById("navDrawer");
  var navClose = document.getElementById("navClose");
  var toTopBtn = document.getElementById("toTop");

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", scrollY > 20);
    }
    if (toTopBtn) {
      toTopBtn.classList.toggle("is-visible", scrollY > 350);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTopBtn) {
    toTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function openDrawer() {
    if (!navDrawer) return;
    navDrawer.setAttribute("data-open", "true");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("is-locked");
  }

  function closeDrawer() {
    if (!navDrawer) return;
    navDrawer.setAttribute("data-open", "false");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("is-locked");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = navDrawer.getAttribute("data-open") === "true";
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (navClose) {
    navClose.addEventListener("click", closeDrawer);
  }

  if (navDrawer) {
    var scrim = navDrawer.querySelector(".nav-drawer__scrim");
    if (scrim) scrim.addEventListener("click", closeDrawer);

    var drawerLinks = navDrawer.querySelectorAll("a[href^='#']");
    drawerLinks.forEach(function (link) {
      link.addEventListener("click", closeDrawer);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (navDrawer && navDrawer.getAttribute("data-open") === "true") {
        closeDrawer();
      }
      closeUserDropdown();
      closeAuthDialog();
      closeFavsDialog();
    }
  });

  /* ---------------------------------------------------------
     4. GERENCIAMENTO DE UI DE AUTENTICAÇÃO E PERFIL
     --------------------------------------------------------- */

  var authDialog = document.getElementById("authDialog");
  var authCloseBtn = document.getElementById("authCloseBtn");
  var userDropdown = document.getElementById("userDropdown");
  var drawerAuth = document.getElementById("drawerAuth");
  var logoutBtn = document.getElementById("logoutBtn");
  var openFavsBtn = document.getElementById("openFavsBtn");

  var tabLogin = document.getElementById("tabLogin");
  var tabRegister = document.getElementById("tabRegister");
  var loginForm = document.getElementById("loginForm");
  var registerForm = document.getElementById("registerForm");
  var forgotForm = document.getElementById("forgotForm");
  var forgotPwdLink = document.getElementById("forgotPwdLink");
  var backToLoginBtn = document.getElementById("backToLoginBtn");
  var demoFillBtn = document.getElementById("demoFillBtn");

  function openAuthDialog(initialTab) {
    if (!authDialog) return;
    closeDrawer();
    closeUserDropdown();
    switchAuthTab(initialTab || "login");
    if (typeof authDialog.showModal === "function") {
      authDialog.showModal();
    } else {
      authDialog.setAttribute("open", "true");
    }
  }

  function closeAuthDialog() {
    if (!authDialog) return;
    if (typeof authDialog.close === "function" && authDialog.open) {
      authDialog.close();
    } else {
      authDialog.removeAttribute("open");
    }
    clearFormErrors();
  }

  if (authCloseBtn) {
    authCloseBtn.addEventListener("click", closeAuthDialog);
  }

  if (authDialog) {
    authDialog.addEventListener("click", function (e) {
      var rect = authDialog.getBoundingClientRect();
      var isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeAuthDialog();
      }
    });
  }

  function switchAuthTab(tab) {
    if (!tabLogin || !tabRegister || !loginForm || !registerForm || !forgotForm) return;

    loginForm.classList.remove("is-active");
    registerForm.classList.remove("is-active");
    forgotForm.classList.remove("is-active");

    tabLogin.classList.remove("is-active");
    tabRegister.classList.remove("is-active");
    tabLogin.setAttribute("aria-selected", "false");
    tabRegister.setAttribute("aria-selected", "false");

    var authTitle = document.getElementById("authTitle");
    var authSubtitle = document.getElementById("authSubtitle");

    if (tab === "register") {
      registerForm.classList.add("is-active");
      tabRegister.classList.add("is-active");
      tabRegister.setAttribute("aria-selected", "true");
      if (authTitle) authTitle.textContent = "Crie sua conta Pé na Estrada";
      if (authSubtitle) authSubtitle.textContent = "Planeje com consultores e acerte cada detalhe da viagem";
    } else if (tab === "forgot") {
      forgotForm.classList.add("is-active");
      if (authTitle) authTitle.textContent = "Recuperar sua senha";
      if (authSubtitle) authSubtitle.textContent = "Enviaremos um link de redefinição por e-mail";
    } else {
      loginForm.classList.add("is-active");
      tabLogin.classList.add("is-active");
      tabLogin.setAttribute("aria-selected", "true");
      if (authTitle) authTitle.textContent = "Sua jornada começa aqui";
      if (authSubtitle) authSubtitle.textContent = "Entre para salvar roteiros e planejar com especialistas";
    }
    clearFormErrors();
  }

  if (tabLogin) tabLogin.addEventListener("click", function () { switchAuthTab("login"); });
  if (tabRegister) tabRegister.addEventListener("click", function () { switchAuthTab("register"); });
  if (forgotPwdLink) forgotPwdLink.addEventListener("click", function () { switchAuthTab("forgot"); });
  if (backToLoginBtn) backToLoginBtn.addEventListener("click", function () { switchAuthTab("login"); });

  if (demoFillBtn) {
    demoFillBtn.addEventListener("click", function () {
      var emailInp = document.getElementById("loginEmail");
      var senhaInp = document.getElementById("loginSenha");
      if (emailInp && senhaInp) {
        emailInp.value = "mariana@exemplo.com";
        senhaInp.value = "senha123";
        showToast("Dados da viajante Mariana Silva preenchidos!", "info");
      }
    });
  }

  document.querySelectorAll(".pwd-toggle-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var targetId = btn.getAttribute("data-target");
      var input = document.getElementById(targetId);
      if (!input) return;
      var isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      btn.innerHTML = isPassword
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    });
  });

  var regSenhaInput = document.getElementById("regSenha");
  var pwdMeter = document.getElementById("pwdMeter");
  var pwdMeterLabel = document.getElementById("pwdMeterLabel");

  if (regSenhaInput && pwdMeter && pwdMeterLabel) {
    regSenhaInput.addEventListener("input", function () {
      var val = regSenhaInput.value;
      if (!val) {
        pwdMeter.setAttribute("data-strength", "0");
        pwdMeterLabel.textContent = "Força da senha";
        return;
      }
      var score = 0;
      if (val.length >= 6) score++;
      if (/[0-9]/.test(val) && val.length >= 8) score++;
      if (/[A-Z]/.test(val) && /[^A-Za-z0-9]/.test(val)) score++;

      score = Math.max(1, Math.min(3, score));
      pwdMeter.setAttribute("data-strength", String(score));
      if (score === 1) pwdMeterLabel.textContent = "Senha fraca (adicione números e símbolos)";
      else if (score === 2) pwdMeterLabel.textContent = "Senha moderada";
      else pwdMeterLabel.textContent = "Senha forte e segura!";
    });
  }

  function clearFormErrors() {
    document.querySelectorAll(".field.has-error").forEach(function (el) {
      el.classList.remove("has-error");
    });
    document.querySelectorAll(".field__error").forEach(function (el) {
      el.textContent = "";
    });
    var alerts = [document.getElementById("loginAlert"), document.getElementById("registerAlert"), document.getElementById("forgotAlert")];
    alerts.forEach(function (al) {
      if (al) al.classList.remove("is-visible");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors();

      var email = (document.getElementById("loginEmail").value || "").trim().toLowerCase();
      var senha = document.getElementById("loginSenha").value || "";
      var remember = document.getElementById("loginRemember").checked;

      var hasError = false;
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setFieldError("loginEmail", "Informe um e-mail válido.");
        hasError = true;
      }
      if (!senha) {
        setFieldError("loginSenha", "Informe sua senha.");
        hasError = true;
      }
      if (hasError) return;

      var users = getUsers();
      var found = users.find(function (u) {
        return u.email.toLowerCase() === email && u.senha === senha;
      });

      if (!found) {
        var alertEl = document.getElementById("loginAlert");
        var alertMsg = document.getElementById("loginAlertMsg");
        if (alertEl && alertMsg) {
          alertMsg.textContent = "E-mail ou senha incorretos. Use mariana@exemplo.com e senha123 para testar.";
          alertEl.classList.add("is-visible");
        }
        return;
      }

      setCurrentUser(found, remember);
      closeAuthDialog();
      updateAuthUI();
      showToast("Bem-vindo(a) de volta, " + found.nome.split(" ")[0] + "!", "success", "Login realizado");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors();

      var nome = (document.getElementById("regNome").value || "").trim();
      var email = (document.getElementById("regEmail").value || "").trim().toLowerCase();
      var senha = document.getElementById("regSenha").value || "";
      var confirma = document.getElementById("regSenhaConfirma").value || "";
      var termos = document.getElementById("regTermos").checked;

      var hasError = false;
      if (!nome || nome.length < 3) {
        setFieldError("regNome", "Informe seu nome completo (mínimo 3 caracteres).");
        hasError = true;
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setFieldError("regEmail", "Informe um e-mail válido.");
        hasError = true;
      }
      if (!senha || senha.length < 6) {
        setFieldError("regSenha", "A senha deve conter no mínimo 6 caracteres.");
        hasError = true;
      }
      if (senha !== confirma) {
        setFieldError("regSenhaConfirma", "As senhas não coincidem.");
        hasError = true;
      }
      if (!termos) {
        setFieldError("regTermos", "É necessário concordar com os termos para continuar.");
        hasError = true;
      }
      if (hasError) return;

      var users = getUsers();
      var exists = users.some(function (u) {
        return u.email.toLowerCase() === email;
      });
      if (exists) {
        var alertEl = document.getElementById("registerAlert");
        var alertMsg = document.getElementById("registerAlertMsg");
        if (alertEl && alertMsg) {
          alertMsg.textContent = "Este e-mail já está cadastrado. Tente entrar na sua conta.";
          alertEl.classList.add("is-visible");
        }
        return;
      }

      var newUser = {
        nome: nome,
        email: email,
        senha: senha,
        favoritos: []
      };
      users.push(newUser);
      saveUsers(users);
      setCurrentUser(newUser, true);

      closeAuthDialog();
      updateAuthUI();
      showToast("Conta criada com sucesso! Aproveite seus roteiros autorais.", "success", "Bem-vindo(a)");
    });
  }

  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();
      clearFormErrors();
      var email = (document.getElementById("forgotEmail").value || "").trim().toLowerCase();
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setFieldError("forgotEmail", "Informe seu e-mail cadastrado.");
        return;
      }

      var alertEl = document.getElementById("forgotAlert");
      var alertMsg = document.getElementById("forgotAlertMsg");
      if (alertEl && alertMsg) {
        alertEl.className = "auth-alert auth-alert--success is-visible";
        alertMsg.textContent = "Link de recuperação enviado com sucesso para " + email + "!";
      }

      setTimeout(function () {
        switchAuthTab("login");
        showToast("Instruções de redefinição enviadas para " + email, "info");
      }, 2600);
    });
  }

  document.querySelectorAll(".btn--social").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var provider = btn.getAttribute("data-provider");
      var demoUser = {
        nome: "Viajante " + provider,
        email: "viajante." + provider.toLowerCase() + "@exemplo.com",
        senha: "social-login",
        favoritos: ["noronha"]
      };
      var users = getUsers();
      var existing = users.find(function (u) { return u.email === demoUser.email; });
      if (!existing) {
        users.push(demoUser);
        saveUsers(users);
      }
      setCurrentUser(existing || demoUser, true);
      closeAuthDialog();
      updateAuthUI();
      showToast("Conectado via " + provider + " com sucesso!", "success");
    });
  });

  function setFieldError(fieldId, msg) {
    var errorEl = document.querySelector('[data-error-for="' + fieldId + '"]');
    var inputEl = document.getElementById(fieldId);
    if (errorEl) errorEl.textContent = msg;
    if (inputEl) {
      var fieldWrapper = inputEl.closest(".field") || inputEl.parentElement;
      if (fieldWrapper) fieldWrapper.classList.add("has-error");
    }
  }

  function toggleUserDropdown() {
    if (!userDropdown) return;
    var isHidden = userDropdown.hidden || !userDropdown.classList.contains("is-open");
    if (isHidden) {
      userDropdown.hidden = false;
      userDropdown.classList.add("is-open");
      var badge = document.querySelector(".user-badge-btn");
      if (badge) badge.setAttribute("aria-expanded", "true");
    } else {
      closeUserDropdown();
    }
  }

  function closeUserDropdown() {
    if (!userDropdown) return;
    userDropdown.classList.remove("is-open");
    var badge = document.querySelector(".user-badge-btn");
    if (badge) badge.setAttribute("aria-expanded", "false");
    setTimeout(function () {
      if (!userDropdown.classList.contains("is-open")) {
        userDropdown.hidden = true;
      }
    }, 200);
  }

  document.addEventListener("click", function (e) {
    var wrapper = document.getElementById("userMenuWrapper");
    if (wrapper && !wrapper.contains(e.target)) {
      closeUserDropdown();
    }
  });

  function logoutUser() {
    clearCurrentUser();
    closeUserDropdown();
    closeDrawer();
    updateAuthUI();
    renderDestinos();
    showToast("Você saiu da sua conta com segurança. Até breve!", "info", "Sessão encerrada");
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", logoutUser);
  }

  /* ---------------------------------------------------------
     5. ATUALIZAÇÃO REATIVA DA UI DE ACORDO COM LOGIN
     --------------------------------------------------------- */

  function updateAuthUI() {
    var user = getCurrentUser();
    var headerAuthWrapper = document.getElementById("userMenuWrapper");

    if (headerAuthWrapper) {
      if (!user) {
        headerAuthWrapper.innerHTML =
          '<button class="btn btn--ghost btn--sm auth-login-btn" id="headerLoginBtn" type="button" aria-haspopup="dialog" aria-label="Entrar na conta">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          "<span>Entrar</span>" +
          "</button>";

        var newLoginBtn = document.getElementById("headerLoginBtn");
        if (newLoginBtn) {
          newLoginBtn.addEventListener("click", function () {
            openAuthDialog("login");
          });
        }
      } else {
        var initials = getInitials(user.nome);
        var firstName = user.nome.split(" ")[0];
        var favCount = (user.favoritos || []).length;

        headerAuthWrapper.innerHTML =
          '<button class="user-badge-btn" id="userBadgeBtn" type="button" aria-expanded="false" aria-haspopup="menu" aria-label="Menu do viajante ' + escapeHtml(user.nome) + '">' +
          '<span class="user-avatar" aria-hidden="true">' + escapeHtml(initials) + "</span>" +
          '<span class="user-badge-name">' + escapeHtml(firstName) + "</span>" +
          '<svg class="user-badge-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
          "</button>" +
          '<div class="user-dropdown" id="userDropdown" role="menu" aria-label="Menu do viajante" hidden>' +
          '<div class="user-dropdown__head">' +
          "<strong>" + escapeHtml(user.nome) + "</strong>" +
          "<small>" + escapeHtml(user.email) + "</small>" +
          "</div>" +
          '<div class="user-dropdown__list">' +
          '<button class="user-dropdown__item" id="openFavsBtn" type="button" role="menuitem">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
          "<span>Roteiros Salvos</span>" +
          '<span class="user-dropdown__badge" id="dropdownFavCount">' + favCount + "</span>" +
          "</button>" +
          '<button class="user-dropdown__item user-dropdown__item--danger" id="logoutBtn" type="button" role="menuitem">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>' +
          "<span>Sair da conta</span>" +
          "</button>" +
          "</div>" +
          "</div>";

        userDropdown = document.getElementById("userDropdown");
        var badgeBtn = document.getElementById("userBadgeBtn");
        if (badgeBtn) {
          badgeBtn.addEventListener("click", toggleUserDropdown);
        }
        var newFavsBtn = document.getElementById("openFavsBtn");
        if (newFavsBtn) {
          newFavsBtn.addEventListener("click", function () {
            closeUserDropdown();
            openFavsDialog();
          });
        }
        var newLogoutBtn = document.getElementById("logoutBtn");
        if (newLogoutBtn) {
          newLogoutBtn.addEventListener("click", logoutUser);
        }
      }
    }

    if (drawerAuth) {
      if (!user) {
        drawerAuth.innerHTML =
          '<div class="drawer-auth__guest">' +
          "<div>" +
          '<strong style="display:block; font-size: var(--fs-sm); color: var(--ink-900);">Área do Viajante</strong>' +
          "<p>Acesse seus roteiros e salve destinos favoritos.</p>" +
          "</div>" +
          '<button class="btn btn--primary btn--block btn--sm" id="drawerLoginBtn" type="button">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          "Entrar ou Criar Conta" +
          "</button>" +
          "</div>";

        var dLoginBtn = document.getElementById("drawerLoginBtn");
        if (dLoginBtn) {
          dLoginBtn.addEventListener("click", function () {
            closeDrawer();
            openAuthDialog("login");
          });
        }
      } else {
        var dInitials = getInitials(user.nome);
        var dFavCount = (user.favoritos || []).length;

        drawerAuth.innerHTML =
          '<div class="drawer-auth__user">' +
          '<div class="drawer-auth__profile">' +
          '<span class="user-avatar" aria-hidden="true">' + escapeHtml(dInitials) + "</span>" +
          '<div class="drawer-auth__info">' +
          "<strong>" + escapeHtml(user.nome) + "</strong>" +
          "<small>" + escapeHtml(user.email) + "</small>" +
          "</div>" +
          "</div>" +
          '<div class="drawer-auth__actions">' +
          '<button class="drawer-auth__btn" id="drawerFavsBtn" type="button">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
          "Salvos (" + dFavCount + ")" +
          "</button>" +
          '<button class="drawer-auth__btn drawer-auth__btn--danger" id="drawerLogoutBtn" type="button">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/></svg>' +
          "Sair" +
          "</button>" +
          "</div>" +
          "</div>";

        var dFavsBtn = document.getElementById("drawerFavsBtn");
        if (dFavsBtn) {
          dFavsBtn.addEventListener("click", function () {
            closeDrawer();
            openFavsDialog();
          });
        }
        var dLogoutBtn = document.getElementById("drawerLogoutBtn");
        if (dLogoutBtn) {
          dLogoutBtn.addEventListener("click", logoutUser);
        }
      }
    }

    updateCardFavoritesUI();
  }

  /* ---------------------------------------------------------
     6. SISTEMA DE ROTEIROS SALVOS (FAVORITOS)
     --------------------------------------------------------- */

  var favsDialog = document.getElementById("favsDialog");
  var favsCloseBtn = document.getElementById("favsCloseBtn");
  var favsList = document.getElementById("favsList");
  var favsEmpty = document.getElementById("favsEmpty");
  var exploreDestinosBtn = document.getElementById("exploreDestinosBtn");

  function toggleFavorite(destinoId) {
    var user = getCurrentUser();
    if (!user) {
      showToast("Faça login ou crie sua conta para salvar seus roteiros favoritos!", "info", "Acesso necessário");
      openAuthDialog("login");
      return;
    }

    user.favoritos = user.favoritos || [];
    var idx = user.favoritos.indexOf(destinoId);
    var destinoObj = (DATA.DESTINOS || []).find(function (d) { return d.id === destinoId; });
    var destName = destinoObj ? destinoObj.nome : "Destino";

    if (idx > -1) {
      user.favoritos.splice(idx, 1);
      showToast(destName + " removido dos seus roteiros salvos.", "info");
    } else {
      user.favoritos.push(destinoId);
      showToast(destName + " adicionado aos seus roteiros salvos!", "success", "Roteiro Salvo");
    }

    var users = getUsers();
    var uIdx = users.findIndex(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); });
    if (uIdx > -1) {
      users[uIdx].favoritos = user.favoritos;
      saveUsers(users);
    }
    var isRemember = !!localStorage.getItem(STORAGE_SESSION_KEY);
    setCurrentUser(user, isRemember);

    updateAuthUI();
    renderFavsList();
  }

  function updateCardFavoritesUI() {
    var user = getCurrentUser();
    var favs = user && user.favoritos ? user.favoritos : [];

    document.querySelectorAll(".card__fav-btn").forEach(function (btn) {
      var id = btn.getAttribute("data-id");
      var isFav = favs.indexOf(id) > -1;
      btn.classList.toggle("is-favorited", isFav);
      btn.setAttribute("aria-label", isFav ? "Remover dos favoritos" : "Salvar nos favoritos");
      btn.setAttribute("title", isFav ? "Salvo nos favoritos" : "Salvar nos favoritos");
    });
  }

  function openFavsDialog() {
    if (!favsDialog) return;
    renderFavsList();
    if (typeof favsDialog.showModal === "function") {
      favsDialog.showModal();
    } else {
      favsDialog.setAttribute("open", "true");
    }
  }

  function closeFavsDialog() {
    if (!favsDialog) return;
    if (typeof favsDialog.close === "function" && favsDialog.open) {
      favsDialog.close();
    } else {
      favsDialog.removeAttribute("open");
    }
  }

  if (favsCloseBtn) {
    favsCloseBtn.addEventListener("click", closeFavsDialog);
  }

  if (favsDialog) {
    favsDialog.addEventListener("click", function (e) {
      var rect = favsDialog.getBoundingClientRect();
      var isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        closeFavsDialog();
      }
    });
  }

  if (exploreDestinosBtn) {
    exploreDestinosBtn.addEventListener("click", closeFavsDialog);
  }

  function renderFavsList() {
    if (!favsList || !favsEmpty) return;
    var user = getCurrentUser();
    var favIds = user && user.favoritos ? user.favoritos : [];

    favsList.innerHTML = "";

    if (favIds.length === 0) {
      favsEmpty.hidden = false;
      return;
    }
    favsEmpty.hidden = true;

    var destinos = (DATA.DESTINOS || []).filter(function (d) {
      return favIds.indexOf(d.id) > -1;
    });

    destinos.forEach(function (d) {
      var li = document.createElement("li");
      li.className = "favs-item";
      li.innerHTML =
        '<div class="favs-item__thumb" aria-hidden="true">' +
        d.getSvg("fav-thumb-" + d.id) +
        "</div>" +
        '<div class="favs-item__info">' +
        "<h4>" + escapeHtml(d.nome) + " (" + escapeHtml(d.estado) + ")</h4>" +
        "<p>" + escapeHtml(d.dias) + " · R$ " + escapeHtml(d.preco) + " / pessoa</p>" +
        "</div>" +
        '<div class="favs-item__actions">' +
        '<a class="btn btn--primary btn--sm" href="#contato" data-dest="' + escapeHtml(d.nome + " — " + d.estado) + '">Planejar</a>' +
        '<button class="icon-btn" type="button" data-remove="' + escapeHtml(d.id) + '" aria-label="Remover ' + escapeHtml(d.nome) + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
        "</button>" +
        "</div>";

      var removeBtn = li.querySelector("[data-remove]");
      if (removeBtn) {
        removeBtn.addEventListener("click", function () {
          toggleFavorite(d.id);
        });
      }

      var planBtn = li.querySelector("a[data-dest]");
      if (planBtn) {
        planBtn.addEventListener("click", function () {
          closeFavsDialog();
          preSelectLeadDestino(d.nome + " — " + d.estado);
        });
      }

      favsList.appendChild(li);
    });
  }

  function preSelectLeadDestino(destValue) {
    var sel = document.getElementById("leadDestino");
    if (!sel) return;
    for (var i = 0; i < sel.options.length; i++) {
      if (sel.options[i].text.indexOf(destValue.split(" — ")[0]) > -1) {
        sel.selectedIndex = i;
        break;
      }
    }
  }

  /* ---------------------------------------------------------
     7. RENDERIZAÇÃO DOS DESTINOS & FILTROS
     --------------------------------------------------------- */

  var destinosGrid = document.getElementById("destinosGrid");
  var destinosEmpty = document.getElementById("destinosEmpty");
  var filterButtons = document.querySelectorAll(".filters .chip");
  var currentFilter = "todos";

  function renderDestinos() {
    if (!destinosGrid) return;
    destinosGrid.innerHTML = "";

    var list = (DATA.DESTINOS || []).filter(function (d) {
      if (currentFilter === "todos") return true;
      return d.categoria === currentFilter;
    });

    if (list.length === 0) {
      if (destinosEmpty) destinosEmpty.hidden = false;
      return;
    }
    if (destinosEmpty) destinosEmpty.hidden = true;

    list.forEach(function (d) {
      var card = document.createElement("li");
      card.className = "card";

      var user = getCurrentUser();
      var isFav = user && user.favoritos && user.favoritos.indexOf(d.id) > -1;

      var tagsHtml = (d.tags || [])
        .map(function (t) { return "<li>" + escapeHtml(t) + "</li>"; })
        .join("");

      var categoryLabel = d.categoria.charAt(0).toUpperCase() + d.categoria.slice(1);

      card.innerHTML =
        '<div class="card__media">' +
        d.getSvg("card-" + d.id) +
        '<span class="card__tag">' + escapeHtml(categoryLabel) + "</span>" +
        '<span class="card__days">' + escapeHtml(d.dias) + "</span>" +
        '<button class="card__fav-btn' + (isFav ? " is-favorited" : "") + '" type="button" data-id="' + escapeHtml(d.id) + '" aria-label="' + (isFav ? "Remover dos favoritos" : "Salvar nos favoritos") + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>' +
        "</button>" +
        "</div>" +
        '<div class="card__body">' +
        '<h3 class="card__title">' + escapeHtml(d.nome) + "</h3>" +
        '<p class="card__place">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        escapeHtml(d.estado) + ", Brasil" +
        "</p>" +
        '<p class="card__text">' + escapeHtml(d.descricao) + "</p>" +
        '<ul class="card__highlights">' + tagsHtml + "</ul>" +
        '<div class="card__foot">' +
        '<div class="card__rating">' +
        '<span class="stars" aria-hidden="true">' +
        '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
        "</span>" +
        "<strong>" + escapeHtml(d.nota) + "</strong>" +
        "<small>(" + d.avaliacoes + ")</small>" +
        "</div>" +
        '<div class="card__price">' +
        "<small>a partir de</small>" +
        "<strong>R$ " + escapeHtml(d.preco) + "</strong>" +
        "</div>" +
        "</div>" +
        '<div style="margin-top: var(--sp-3); display: flex; gap: var(--sp-2);">' +
        '<a class="btn btn--primary btn--sm btn--block" href="#contato" data-lead-target="' + escapeHtml(d.nome + " — " + d.estado) + '">Quero esse roteiro</a>' +
        "</div>" +
        "</div>";

      var favBtn = card.querySelector(".card__fav-btn");
      if (favBtn) {
        favBtn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite(d.id);
        });
      }

      var ctaBtn = card.querySelector("[data-lead-target]");
      if (ctaBtn) {
        ctaBtn.addEventListener("click", function () {
          preSelectLeadDestino(d.nome + " — " + d.estado);
        });
      }

      destinosGrid.appendChild(card);
    });
  }

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      currentFilter = btn.getAttribute("data-filter") || "todos";
      renderDestinos();
    });
  });

  /* ---------------------------------------------------------
     8. DIFERENCIAIS (FEATURES)
     --------------------------------------------------------- */

  function renderFeatures() {
    var grid = document.getElementById("featureGrid");
    if (!grid || !DATA.FEATURE_GRID) return;
    grid.innerHTML = "";

    DATA.FEATURE_GRID.forEach(function (f) {
      var item = document.createElement("li");
      item.className = "feature";
      item.innerHTML =
        '<div class="feature__icon" aria-hidden="true">' + f.icon + "</div>" +
        "<h3>" + escapeHtml(f.titulo) + "</h3>" +
        "<p>" + escapeHtml(f.descricao) + "</p>";
      grid.appendChild(item);
    });
  }

  /* ---------------------------------------------------------
     9. ROTEIRO CHAPADA & ACORDEÃO
     --------------------------------------------------------- */

  function renderRoteiro() {
    var visual = document.getElementById("roteiroVisual");
    if (visual && typeof SCENES !== "undefined" && SCENES.chapada) {
      visual.innerHTML = SCENES.chapada("roteiro-destaque");
    }

    var accordion = document.getElementById("roteiroAccordion");
    if (!accordion || !DATA.ROTEIRO_ACCORDION) return;
    accordion.innerHTML = "";

    DATA.ROTEIRO_ACCORDION.forEach(function (item, index) {
      var li = document.createElement("li");
      li.className = "accordion__item";

      var isOpen = index === 0;
      var panelId = "accordion-panel-" + index;

      li.innerHTML =
        '<button class="accordion__trigger" type="button" aria-expanded="' + (isOpen ? "true" : "false") + '" aria-controls="' + panelId + '">' +
        '<span class="accordion__day" aria-hidden="true">' + escapeHtml(item.day) + "</span>" +
        '<span class="accordion__label">' + escapeHtml(item.title) + "</span>" +
        '<svg class="accordion__caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
        "</button>" +
        '<div class="accordion__panel' + (isOpen ? " is-open" : "") + '" id="' + panelId + '" role="region">' +
        "<div><p>" + escapeHtml(item.content) + "</p></div>" +
        "</div>";

      var trigger = li.querySelector(".accordion__trigger");
      var panel = li.querySelector(".accordion__panel");

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        panel.classList.toggle("is-open", !expanded);
      });

      accordion.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     10. SLIDER DE DEPOIMENTOS COM GESTOS TOUCH (RESPONSIVO)
     --------------------------------------------------------- */

  var depoIndex = 0;
  var depoTimer = null;

  function initSlider() {
    var track = document.getElementById("depoTrack");
    var dotsContainer = document.getElementById("depoDots");
    var prevBtn = document.getElementById("depoPrev");
    var nextBtn = document.getElementById("depoNext");
    var sliderEl = document.getElementById("depoSlider");

    if (!track || !dotsContainer || !DATA.DEPOIMENTOS) return;

    var list = DATA.DEPOIMENTOS;
    track.innerHTML = "";
    dotsContainer.innerHTML = "";

    list.forEach(function (d, i) {
      var slide = document.createElement("li");
      slide.className = "slider__slide";
      slide.innerHTML =
        '<blockquote class="slider__quote">“' + escapeHtml(d.quote) + '”</blockquote>' +
        '<div class="slider__author">' +
        '<div class="slider__avatar" aria-hidden="true">' + escapeHtml(d.initials) + "</div>" +
        '<div class="slider__who">' +
        "<strong>" + escapeHtml(d.name) + "</strong>" +
        "<span>" + escapeHtml(d.location) + "</span>" +
        "</div>" +
        "</div>";
      track.appendChild(slide);

      var dot = document.createElement("button");
      dot.className = "dot" + (i === 0 ? " is-active" : "");
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Depoimento " + (i + 1) + " de " + list.length);
      dot.setAttribute("aria-selected", i === 0 ? "true" : "false");
      dot.addEventListener("click", function () {
        goToSlide(i);
        restartTimer();
      });
      dotsContainer.appendChild(dot);
    });

    function goToSlide(i) {
      depoIndex = (i + list.length) % list.length;
      track.style.transform = "translateX(-" + depoIndex * 100 + "%)";
      dotsContainer.querySelectorAll(".dot").forEach(function (dt, idx) {
        dt.classList.toggle("is-active", idx === depoIndex);
        dt.setAttribute("aria-selected", idx === depoIndex ? "true" : "false");
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goToSlide(depoIndex - 1);
        restartTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goToSlide(depoIndex + 1);
        restartTimer();
      });
    }

    var startX = 0;
    var distThreshold = 40;

    track.addEventListener("touchstart", function (e) {
      startX = e.changedTouches[0].pageX;
      clearInterval(depoTimer);
    }, { passive: true });

    track.addEventListener("touchend", function (e) {
      var diffX = e.changedTouches[0].pageX - startX;
      if (Math.abs(diffX) > distThreshold) {
        if (diffX > 0) {
          goToSlide(depoIndex - 1);
        } else {
          goToSlide(depoIndex + 1);
        }
      }
      restartTimer();
    }, { passive: true });

    function restartTimer() {
      clearInterval(depoTimer);
      depoTimer = setInterval(function () {
        goToSlide(depoIndex + 1);
      }, 6500);
    }

    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", function () { clearInterval(depoTimer); });
      sliderEl.addEventListener("mouseleave", restartTimer);
    }

    restartTimer();
  }

  /* ---------------------------------------------------------
     11. FORMULÁRIO DA HERO & FORMULÁRIO DE CONTATO (LEAD)
     --------------------------------------------------------- */

  var searchForm = document.getElementById("searchForm");
  var searchFeedback = document.getElementById("searchFeedback");

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var destino = (document.getElementById("buscaDestino").value || "").trim();
      var quando = document.getElementById("buscaQuando").value;

      if (!destino && !quando) {
        if (searchFeedback) searchFeedback.textContent = "Selecione ao menos um destino ou período para buscar.";
        return;
      }

      if (searchFeedback) {
        searchFeedback.textContent = "Buscando as melhores opções para " + (destino || "seu destino") + "...";
      }

      setTimeout(function () {
        var destinosSec = document.getElementById("destinos");
        if (destinosSec) {
          destinosSec.scrollIntoView({ behavior: "smooth" });
        }
        if (searchFeedback) searchFeedback.textContent = "";
      }, 350);
    });
  }

  var leadForm = document.getElementById("leadForm");
  var leadStatus = document.getElementById("leadStatus");

  if (leadForm) {
    leadForm.addEventListener("submit", function (e) {
      e.preventDefault();

      leadForm.querySelectorAll(".field.has-error").forEach(function (el) { el.classList.remove("has-error"); });
      leadForm.querySelectorAll(".field__error").forEach(function (el) { el.textContent = ""; });

      var nome = (document.getElementById("leadNome").value || "").trim();
      var email = (document.getElementById("leadEmail").value || "").trim();
      var destino = document.getElementById("leadDestino").value;
      var aceite = document.getElementById("leadAceite").checked;

      var valid = true;
      if (!nome || nome.length < 3) {
        setFieldError("leadNome", "Por favor, digite seu nome completo.");
        valid = false;
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        setFieldError("leadEmail", "Digite um e-mail válido para receber os roteiros.");
        valid = false;
      }
      if (!destino) {
        setFieldError("leadDestino", "Selecione um destino de interesse.");
        valid = false;
      }
      if (!aceite) {
        setFieldError("leadAceite", "É necessário aceitar os termos para envio dos roteiros.");
        valid = false;
      }

      if (!valid) return;

      if (leadStatus) {
        leadStatus.className = "form-status";
        leadStatus.textContent = "Preparando seus 3 roteiros personalizados...";
      }

      setTimeout(function () {
        if (leadStatus) {
          leadStatus.textContent = "✓ Solicitação recebida! Em até 1 dia útil nosso especialista entrará em contato.";
        }
        leadForm.reset();
        showToast("Roteiros solicitados com sucesso! Verifique seu e-mail em breve.", "success", "Tudo certo!");
      }, 900);
    });
  }

  /* ---------------------------------------------------------
     12. INICIALIZAÇÃO GERAL
     --------------------------------------------------------- */

  function init() {
    var anoEl = document.getElementById("anoAtual");
    if (anoEl) anoEl.textContent = new Date().getFullYear();

    renderDestinos();
    renderFeatures();
    renderRoteiro();
    initSlider();

    updateAuthUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
