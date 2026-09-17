/* =========================================================
   main.js — Interatividade, Responsividade e Sistema de Login
   Pé na Estrada — Viagens autorais pelo Brasil
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------------
     0. GERENCIAMENTO DE TEMA (DARK / LIGHT MODE)
     --------------------------------------------------------- */

  var THEME_STORAGE_KEY = "penaestrada_theme";

  function initTheme() {
    var saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (!saved) {
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      saved = prefersDark ? "dark" : "light";
    }
    applyTheme(saved);

    var toggleBtn = document.getElementById("themeToggleBtn");
    var drawerToggleBtn = document.getElementById("drawerThemeToggleBtn");

    function handleToggle() {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      showToast(next === "dark" ? "Modo Noturno ativado" : "Modo Claro ativado", "info");
    }

    if (toggleBtn) toggleBtn.addEventListener("click", handleToggle);
    if (drawerToggleBtn) drawerToggleBtn.addEventListener("click", handleToggle);

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {}
  }

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
  var scrollProgress = document.getElementById("scrollProgress");

  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    if (siteHeader) {
      siteHeader.classList.toggle("is-scrolled", scrollY > 20);
    }
    if (toTopBtn) {
      toTopBtn.classList.toggle("is-visible", scrollY > 350);
    }
    if (scrollProgress) {
      var maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      var pct = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      scrollProgress.style.width = Math.min(100, Math.max(0, pct)) + "%";
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
          '<button class="user-dropdown__item" id="openProfileBtn" type="button" role="menuitem">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          "<span>Painel do Viajante</span>" +
          "</button>" +
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
        var newProfileBtn = document.getElementById("openProfileBtn");
        if (newProfileBtn) {
          newProfileBtn.addEventListener("click", function () {
            closeUserDropdown();
            openProfileModal();
          });
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
          '<button class="drawer-auth__btn" id="drawerProfileBtn" type="button">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          "Painel" +
          "</button>" +
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

        var dProfileBtn = document.getElementById("drawerProfileBtn");
        if (dProfileBtn) {
          dProfileBtn.addEventListener("click", function () {
            closeDrawer();
            openProfileModal();
          });
        }
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
     7. RENDERIZAÇÃO DOS DESTINOS & BUSCA / FILTROS MULTIDIMENSIONAIS
     --------------------------------------------------------- */

  var destinosGrid = document.getElementById("destinosGrid");
  var destinosEmpty = document.getElementById("destinosEmpty");
  var emptyResetBtn = document.getElementById("emptyResetBtn");
  var filterButtons = document.querySelectorAll(".filters .chip");
  var destinosSearchInput = document.getElementById("destinosSearchInput");
  var destinosPriceSlider = document.getElementById("destinosPriceSlider");
  var destinosPriceValue = document.getElementById("destinosPriceValue");
  var destinosSortSelect = document.getElementById("destinosSortSelect");
  var destinosCount = document.getElementById("destinosCount");
  var btnResetFilters = document.getElementById("btnResetFilters");

  var currentFilter = "todos";
  var searchQuery = "";
  var maxPrice = 6000;
  var currentSort = "populares";

  function renderDestinos() {
    if (!destinosGrid) return;
    destinosGrid.innerHTML = "";

    var list = (DATA.DESTINOS || []).filter(function (d) {
      // 1. Categoria
      if (currentFilter !== "todos" && d.categoria !== currentFilter) {
        return false;
      }
      // 2. Preço Máximo
      if (d.precoNum && d.precoNum > maxPrice) {
        return false;
      }
      // 3. Busca Textual
      if (searchQuery) {
        var q = searchQuery.toLowerCase();
        var matchNome = d.nome.toLowerCase().indexOf(q) > -1;
        var matchEstado = d.estado.toLowerCase().indexOf(q) > -1;
        var matchDesc = (d.descricao || "").toLowerCase().indexOf(q) > -1;
        var matchTags = (d.tags || []).some(function (t) { return t.toLowerCase().indexOf(q) > -1; });
        if (!matchNome && !matchEstado && !matchDesc && !matchTags) {
          return false;
        }
      }
      return true;
    });

    // Ordenação
    list.sort(function (a, b) {
      if (currentSort === "preco-asc") return (a.precoNum || 0) - (b.precoNum || 0);
      if (currentSort === "preco-desc") return (b.precoNum || 0) - (a.precoNum || 0);
      if (currentSort === "duracao-asc") return (a.duracaoDias || 0) - (b.duracaoDias || 0);
      // Padrão: mais populares (nota e avaliações)
      var scoreA = parseFloat(a.nota) * 1000 + (a.avaliacoes || 0);
      var scoreB = parseFloat(b.nota) * 1000 + (b.avaliacoes || 0);
      return scoreB - scoreA;
    });

    if (destinosCount) {
      destinosCount.textContent = list.length;
    }

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
      var isCompared = comparedDestinos.indexOf(d.id) > -1;

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
        '<button class="btn btn--ghost btn--sm card__btn-detail" type="button" data-detail="' + escapeHtml(d.id) + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>' +
        "Ver detalhes & simular" +
        "</button>" +
        '<button class="card__btn-compare' + (isCompared ? " is-compared" : "") + '" type="button" data-compare="' + escapeHtml(d.id) + '" aria-label="Comparar ' + escapeHtml(d.nome) + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20L20.2 3.8M21 16v5h-5M15 15l5.1 5.1M4 4l5 5"/></svg>' +
        "<span>" + (isCompared ? "Comparando" : "Comparar") + "</span>" +
        "</button>" +
        '<button class="card__btn-share" type="button" data-share="' + escapeHtml(d.id) + '" aria-label="Compartilhar roteiro ' + escapeHtml(d.nome) + '">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>' +
        "</button>" +
        "</div>" +
        '<div style="margin-top: var(--sp-2);">' +
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

      var detailBtn = card.querySelector("[data-detail]");
      if (detailBtn) {
        detailBtn.addEventListener("click", function () {
          openDestinationModal(d.id);
        });
      }

      var compareBtn = card.querySelector("[data-compare]");
      if (compareBtn) {
        compareBtn.addEventListener("click", function () {
          toggleCompare(d.id);
        });
      }

      var shareBtn = card.querySelector("[data-share]");
      if (shareBtn) {
        shareBtn.addEventListener("click", function () {
          shareDestino(d);
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

  // Compartilhamento com Web Share API ou cópia para área de transferência
  function shareDestino(destino) {
    var title = "Roteiro Autoral: " + destino.nome + " — Pé na Estrada";
    var text = "Olha que viagem incrível para " + destino.nome + " (" + destino.dias + ") a partir de R$ " + destino.preco + "!";
    var url = window.location.href.split("#")[0] + "#destinos";

    if (navigator.share) {
      navigator.share({ title: title, text: text, url: url }).catch(function () {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(title + " — " + text + " " + url).then(function () {
        showToast("Link do roteiro copiado para a área de transferência!", "success", "Compartilhar");
      });
    } else {
      showToast("Explore " + destino.nome + " no site da Pé na Estrada!", "info");
    }
  }

  // Event Listeners dos Filtros
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

  if (destinosSearchInput) {
    destinosSearchInput.addEventListener("input", function (e) {
      searchQuery = (e.target.value || "").trim();
      renderDestinos();
    });
  }

  if (destinosPriceSlider) {
    destinosPriceSlider.addEventListener("input", function (e) {
      maxPrice = parseInt(e.target.value, 10) || 6000;
      if (destinosPriceValue) {
        destinosPriceValue.textContent = "Até R$ " + maxPrice.toLocaleString("pt-BR");
      }
      renderDestinos();
    });
  }

  if (destinosSortSelect) {
    destinosSortSelect.addEventListener("change", function (e) {
      currentSort = e.target.value || "populares";
      renderDestinos();
    });
  }

  function resetAllFilters() {
    currentFilter = "todos";
    searchQuery = "";
    maxPrice = 6000;
    currentSort = "populares";

    if (destinosSearchInput) destinosSearchInput.value = "";
    if (destinosPriceSlider) destinosPriceSlider.value = 6000;
    if (destinosPriceValue) destinosPriceValue.textContent = "Até R$ 6.000";
    if (destinosSortSelect) destinosSortSelect.value = "populares";

    filterButtons.forEach(function (b) {
      var isTodos = b.getAttribute("data-filter") === "todos";
      b.classList.toggle("is-active", isTodos);
      b.setAttribute("aria-pressed", isTodos ? "true" : "false");
    });

    renderDestinos();
    showToast("Filtros redefinidos!", "info");
  }

  if (btnResetFilters) btnResetFilters.addEventListener("click", resetAllFilters);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", resetAllFilters);

  /* ---------------------------------------------------------
     8. SISTEMA DE COMPARAÇÃO DE ROTEIROS
     --------------------------------------------------------- */

  var comparedDestinos = [];
  var compareBar = document.getElementById("compareBar");
  var compareBarCount = document.getElementById("compareBarCount");
  var compareBarItems = document.getElementById("compareBarItems");
  var openCompareModalBtn = document.getElementById("openCompareModalBtn");
  var clearCompareBtn = document.getElementById("clearCompareBtn");
  var compareModal = document.getElementById("compareModal");
  var compareCloseBtn = document.getElementById("compareCloseBtn");
  var compareGrid = document.getElementById("compareGrid");

  function toggleCompare(destId) {
    var idx = comparedDestinos.indexOf(destId);
    if (idx > -1) {
      comparedDestinos.splice(idx, 1);
    } else {
      if (comparedDestinos.length >= 3) {
        showToast("Você pode comparar no máximo 3 roteiros lado a lado.", "error", "Limite atingido");
        return;
      }
      comparedDestinos.push(destId);
      showToast("Roteiro adicionado à comparação!", "info");
    }
    updateCompareUI();
    renderDestinos();
  }

  function updateCompareUI() {
    if (!compareBar || !compareBarCount || !compareBarItems) return;

    if (comparedDestinos.length === 0) {
      compareBar.classList.remove("is-active");
      return;
    }

    compareBar.classList.add("is-active");
    compareBarCount.textContent = comparedDestinos.length + " de 3 selecionados";
    compareBarItems.innerHTML = "";

    comparedDestinos.forEach(function (id) {
      var dest = (DATA.DESTINOS || []).find(function (d) { return d.id === id; });
      if (!dest) return;

      var chip = document.createElement("span");
      chip.className = "compare-chip";
      chip.innerHTML =
        escapeHtml(dest.nome) +
        '<button type="button" data-remove-compare="' + escapeHtml(dest.id) + '" aria-label="Remover ' + escapeHtml(dest.nome) + ' da comparação">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        "</button>";

      chip.querySelector("[data-remove-compare]").addEventListener("click", function () {
        toggleCompare(dest.id);
      });

      compareBarItems.appendChild(chip);
    });
  }

  if (clearCompareBtn) {
    clearCompareBtn.addEventListener("click", function () {
      comparedDestinos = [];
      updateCompareUI();
      renderDestinos();
      showToast("Comparação limpa!", "info");
    });
  }

  function openCompareModal() {
    if (!compareModal || !compareGrid) return;
    if (comparedDestinos.length === 0) {
      showToast("Selecione ao menos 1 destino para comparar.", "info");
      return;
    }

    compareGrid.innerHTML = "";
    var destinos = (DATA.DESTINOS || []).filter(function (d) {
      return comparedDestinos.indexOf(d.id) > -1;
    });

    destinos.forEach(function (d) {
      var col = document.createElement("div");
      col.className = "compare-col";

      var dailyApprox = Math.round(d.precoNum / (d.duracaoDias || 5));

      col.innerHTML =
        '<div class="compare-col__media">' +
        d.getSvg("compare-col-" + d.id) +
        "</div>" +
        '<h3 class="compare-col__title">' + escapeHtml(d.nome) + "</h3>" +
        '<span class="compare-col__place">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
        escapeHtml(d.estado) + ", Brasil" +
        "</span>" +
        '<div class="compare-row-item">' +
        "<span>Investimento Base</span>" +
        "<strong>R$ " + escapeHtml(d.preco) + " (" + escapeHtml(d.dias) + ")</strong>" +
        "</div>" +
        '<div class="compare-row-item">' +
        "<span>Custo Médio Diário</span>" +
        "<strong>R$ " + dailyApprox.toLocaleString("pt-BR") + " / dia</strong>" +
        "</div>" +
        '<div class="compare-row-item">' +
        "<span>Intensidade / Esforço</span>" +
        "<strong>" + escapeHtml(d.esforco || "Moderado") + "</strong>" +
        "</div>" +
        '<div class="compare-row-item">' +
        "<span>Melhor Época</span>" +
        "<strong>" + escapeHtml(d.melhorEpoca || "Ano todo") + "</strong>" +
        "</div>" +
        '<div class="compare-row-item">' +
        "<span>Avaliação Média</span>" +
        "<strong>★ " + escapeHtml(d.nota) + " (" + d.avaliacoes + " relatos)</strong>" +
        "</div>" +
        '<div style="margin-top: auto; display: flex; flex-direction: column; gap: var(--sp-2);">' +
        '<button class="btn btn--primary btn--sm btn--block" type="button" data-sim-from-compare="' + escapeHtml(d.id) + '">Ver detalhes & simular</button>' +
        '<a class="btn btn--ghost btn--sm btn--block" href="#contato" data-lead-from-compare="' + escapeHtml(d.nome + " — " + d.estado) + '">Quero esse roteiro</a>' +
        "</div>";

      col.querySelector("[data-sim-from-compare]").addEventListener("click", function () {
        closeCompareModal();
        openDestinationModal(d.id);
      });

      col.querySelector("[data-lead-from-compare]").addEventListener("click", function () {
        closeCompareModal();
        preSelectLeadDestino(d.nome + " — " + d.estado);
      });

      compareGrid.appendChild(col);
    });

    if (typeof compareModal.showModal === "function") {
      compareModal.showModal();
    } else {
      compareModal.setAttribute("open", "true");
    }
  }

  function closeCompareModal() {
    if (!compareModal) return;
    if (typeof compareModal.close === "function" && compareModal.open) {
      compareModal.close();
    } else {
      compareModal.removeAttribute("open");
    }
  }

  if (openCompareModalBtn) openCompareModalBtn.addEventListener("click", openCompareModal);
  if (compareCloseBtn) compareCloseBtn.addEventListener("click", closeCompareModal);

  /* ---------------------------------------------------------
     9. MODAL DE DETALHES DO ROTEIRO & SIMULADOR FINANCEIRO
     --------------------------------------------------------- */

  var destinationModal = document.getElementById("destinationModal");
  var detailCloseBtn = document.getElementById("detailCloseBtn");
  var tabDetailOverview = document.getElementById("tabDetailOverview");
  var tabDetailItinerary = document.getElementById("tabDetailItinerary");
  var tabDetailSimulator = document.getElementById("tabDetailSimulator");
  var panelDetailOverview = document.getElementById("panelDetailOverview");
  var panelDetailItinerary = document.getElementById("panelDetailItinerary");
  var panelDetailSimulator = document.getElementById("panelDetailSimulator");

  var activeDestino = null;
  var simTravelers = 2;
  var simHotelTier = "standard";
  var simSelectedAddonIds = [];

  function openDestinationModal(destId) {
    var dest = (DATA.DESTINOS || []).find(function (d) { return d.id === destId; });
    if (!dest || !destinationModal) return;

    activeDestino = dest;
    simTravelers = 2;
    simHotelTier = "standard";
    simSelectedAddonIds = [];

    // Header & Banner
    var bannerMedia = document.getElementById("detailBannerMedia");
    if (bannerMedia) bannerMedia.innerHTML = dest.getSvg("modal-banner-" + dest.id);

    var titleEl = document.getElementById("detailTitle");
    if (titleEl) titleEl.textContent = dest.nome;

    var badgesEl = document.getElementById("detailBadges");
    if (badgesEl) {
      badgesEl.innerHTML =
        '<span class="detail-badge">' + escapeHtml(dest.estado) + ', Brasil</span>' +
        '<span class="detail-badge">' + escapeHtml(dest.dias) + "</span>" +
        '<span class="detail-badge">Nível ' + escapeHtml(dest.esforco || "Moderado") + "</span>" +
        '<span class="detail-badge">★ ' + escapeHtml(dest.nota) + " (" + dest.avaliacoes + ")</span>";
    }

    // Tab 1: Visão Geral
    var descText = document.getElementById("detailDescText");
    if (descText) descText.textContent = dest.descricao;

    var incList = document.getElementById("detailInclusosList");
    if (incList) {
      incList.innerHTML = (dest.inclusos || [
        "Hospedagem selecionada com café da manhã",
        "Passeios com guias nativos credenciados",
        "Seguro viagem completo de aventura"
      ]).map(function (item) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>' + escapeHtml(item) + '</span></li>';
      }).join("");
    }

    var naoIncList = document.getElementById("detailNaoInclusosList");
    if (naoIncList) {
      naoIncList.innerHTML = (dest.naoInclusos || [
        "Passagens aéreas até o destino",
        "Despesas de caráter pessoal"
      ]).map(function (item) {
        return '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg><span>' + escapeHtml(item) + '</span></li>';
      }).join("");
    }

    var melhorEpocaEl = document.getElementById("detailMelhorEpoca");
    if (melhorEpocaEl) melhorEpocaEl.textContent = dest.melhorEpoca || "Ano inteiro, com excelentes condições.";

    // Tab 2: Itinerário
    var timeline = document.getElementById("detailItineraryTimeline");
    if (timeline) {
      timeline.innerHTML = "";
      (dest.itinerario || []).forEach(function (step) {
        var row = document.createElement("div");
        row.className = "itinerary-step";
        row.innerHTML =
          '<div class="itinerary-step__badge">' + escapeHtml(step.dia) + "</div>" +
          '<div class="itinerary-step__content">' +
          "<h4>" + escapeHtml(step.titulo) + "</h4>" +
          "<p>" + escapeHtml(step.desc) + "</p>" +
          "</div>";
        timeline.appendChild(row);
      });
    }

    // Tab 3: Inicializar opções do Simulador
    var boutiquePriceEl = document.getElementById("simHotelBoutiquePrice");
    var luxoPriceEl = document.getElementById("simHotelLuxoPrice");
    if (boutiquePriceEl) boutiquePriceEl.textContent = "+R$ " + (dest.hospedagens && dest.hospedagens.boutique ? dest.hospedagens.boutique.toLocaleString("pt-BR") : "450");
    if (luxoPriceEl) luxoPriceEl.textContent = "+R$ " + (dest.hospedagens && dest.hospedagens.luxo ? dest.hospedagens.luxo.toLocaleString("pt-BR") : "1.100");

    var hotelRadios = document.querySelectorAll('input[name="simHotel"]');
    hotelRadios.forEach(function (r) {
      r.checked = r.value === "standard";
      r.addEventListener("change", function () {
        simHotelTier = r.value;
        updateSimulationTotal();
      });
    });

    var addonsList = document.getElementById("simAddonsList");
    if (addonsList) {
      addonsList.innerHTML = "";
      (dest.opcionais || []).forEach(function (opt) {
        var item = document.createElement("label");
        item.className = "sim-addon-item";
        item.innerHTML =
          '<div class="sim-addon-label">' +
          '<input type="checkbox" data-addon-id="' + escapeHtml(opt.id) + '" />' +
          "<span>" + escapeHtml(opt.nome) + "</span>" +
          "</div>" +
          '<span class="sim-addon-price">+R$ ' + opt.preco.toLocaleString("pt-BR") + "</span>";

        var chk = item.querySelector("input");
        chk.addEventListener("change", function () {
          if (chk.checked) {
            simSelectedAddonIds.push(opt.id);
          } else {
            var i = simSelectedAddonIds.indexOf(opt.id);
            if (i > -1) simSelectedAddonIds.splice(i, 1);
          }
          updateSimulationTotal();
        });

        addonsList.appendChild(item);
      });
    }

    var travelersCountEl = document.getElementById("simTravelersCount");
    if (travelersCountEl) travelersCountEl.textContent = simTravelers;

    switchDetailTab("overview");
    updateSimulationTotal();

    if (typeof destinationModal.showModal === "function") {
      destinationModal.showModal();
    } else {
      destinationModal.setAttribute("open", "true");
    }
  }

  function closeDestinationModal() {
    if (!destinationModal) return;
    if (typeof destinationModal.close === "function" && destinationModal.open) {
      destinationModal.close();
    } else {
      destinationModal.removeAttribute("open");
    }
  }

  if (detailCloseBtn) detailCloseBtn.addEventListener("click", closeDestinationModal);

  function switchDetailTab(tabName) {
    var tabs = [tabDetailOverview, tabDetailItinerary, tabDetailSimulator];
    var panels = [panelDetailOverview, panelDetailItinerary, panelDetailSimulator];

    tabs.forEach(function (t) {
      if (!t) return;
      var isActive = t.getAttribute("data-tab") === tabName;
      t.classList.toggle("is-active", isActive);
      t.setAttribute("aria-selected", String(isActive));
    });

    if (panelDetailOverview) panelDetailOverview.classList.toggle("is-active", tabName === "overview");
    if (panelDetailItinerary) panelDetailItinerary.classList.toggle("is-active", tabName === "itinerary");
    if (panelDetailSimulator) panelDetailSimulator.classList.toggle("is-active", tabName === "simulator");
  }

  if (tabDetailOverview) tabDetailOverview.addEventListener("click", function () { switchDetailTab("overview"); });
  if (tabDetailItinerary) tabDetailItinerary.addEventListener("click", function () { switchDetailTab("itinerary"); });
  if (tabDetailSimulator) tabDetailSimulator.addEventListener("click", function () { switchDetailTab("simulator"); });

  // Controle de Viajantes do Simulador
  var simTravelersMinus = document.getElementById("simTravelersMinus");
  var simTravelersPlus = document.getElementById("simTravelersPlus");
  var simTravelersCount = document.getElementById("simTravelersCount");

  if (simTravelersMinus) {
    simTravelersMinus.addEventListener("click", function () {
      if (simTravelers > 1) {
        simTravelers--;
        if (simTravelersCount) simTravelersCount.textContent = simTravelers;
        updateSimulationTotal();
      }
    });
  }

  if (simTravelersPlus) {
    simTravelersPlus.addEventListener("click", function () {
      if (simTravelers < 10) {
        simTravelers++;
        if (simTravelersCount) simTravelersCount.textContent = simTravelers;
        updateSimulationTotal();
      }
    });
  }

  function updateSimulationTotal() {
    if (!activeDestino) return;

    var basePerson = activeDestino.precoNum || 4000;
    var baseTotal = basePerson * simTravelers;

    var hotelDiffPerson = (activeDestino.hospedagens && activeDestino.hospedagens[simHotelTier]) || 0;
    var hotelTotal = hotelDiffPerson * simTravelers;

    var addonsTotal = 0;
    (activeDestino.opcionais || []).forEach(function (opt) {
      if (simSelectedAddonIds.indexOf(opt.id) > -1) {
        addonsTotal += opt.preco * simTravelers;
      }
    });

    var subtotal = baseTotal + hotelTotal + addonsTotal;
    var discount = simTravelers >= 4 ? Math.round(subtotal * 0.08) : 0;
    var finalTotal = subtotal - discount;

    var installment10x = Math.round(finalTotal / 10);
    var pixDiscounted = Math.round(finalTotal * 0.95);

    var personsSummary = document.getElementById("simSummaryPersons");
    var breakdownBase = document.getElementById("simBreakdownBase");
    var breakdownHotel = document.getElementById("simBreakdownHotel");
    var breakdownAddons = document.getElementById("simBreakdownAddons");
    var discountRow = document.getElementById("simDiscountRow");
    var breakdownDiscount = document.getElementById("simBreakdownDiscount");
    var totalPriceEl = document.getElementById("simTotalPrice");
    var installmentPriceEl = document.getElementById("simInstallmentPrice");
    var pixPriceEl = document.getElementById("simPixPrice");

    if (personsSummary) personsSummary.textContent = simTravelers;
    if (breakdownBase) breakdownBase.textContent = "R$ " + baseTotal.toLocaleString("pt-BR");
    if (breakdownHotel) breakdownHotel.textContent = "R$ " + hotelTotal.toLocaleString("pt-BR");
    if (breakdownAddons) breakdownAddons.textContent = "R$ " + addonsTotal.toLocaleString("pt-BR");

    if (discountRow && breakdownDiscount) {
      if (discount > 0) {
        discountRow.hidden = false;
        breakdownDiscount.textContent = "- R$ " + discount.toLocaleString("pt-BR");
      } else {
        discountRow.hidden = true;
      }
    }

    if (totalPriceEl) totalPriceEl.textContent = "R$ " + finalTotal.toLocaleString("pt-BR");
    if (installmentPriceEl) installmentPriceEl.textContent = "R$ " + installment10x.toLocaleString("pt-BR");
    if (pixPriceEl) pixPriceEl.textContent = "R$ " + pixDiscounted.toLocaleString("pt-BR");
  }

  // Ações de Contratação e Salvamento da Simulação
  var btnBookSimulatedTrip = document.getElementById("btnBookSimulatedTrip");
  var btnSaveSimulation = document.getElementById("btnSaveSimulation");

  if (btnBookSimulatedTrip) {
    btnBookSimulatedTrip.addEventListener("click", function () {
      if (!activeDestino) return;

      var destNameFull = activeDestino.nome + " — " + activeDestino.estado;
      var hotelLabel = simHotelTier === "boutique" ? "Pousada Charme" : simHotelTier === "luxo" ? "Suíte Luxo" : "Pousada Familiar Padrão";

      var addonNames = [];
      (activeDestino.opcionais || []).forEach(function (opt) {
        if (simSelectedAddonIds.indexOf(opt.id) > -1) addonNames.push(opt.nome);
      });

      var totalText = document.getElementById("simTotalPrice") ? document.getElementById("simTotalPrice").textContent : "R$ 0";

      var msg =
        "Olá! Montei uma simulação personalizada pelo configurador:\n" +
        "• Destino: " + destNameFull + "\n" +
        "• Viajantes: " + simTravelers + " pessoa(s)\n" +
        "• Padrão de Hospedagem: " + hotelLabel + "\n" +
        (addonNames.length > 0 ? "• Opcionais selecionados: " + addonNames.join(", ") + "\n" : "") +
        "• Valor estimado calculado: " + totalText + " (10x sem juros ou 5% desc. no PIX).\n" +
        "Gostaria de formalizar essa proposta!";

      closeDestinationModal();

      preSelectLeadDestino(destNameFull);

      var selPessoas = document.getElementById("leadPessoas");
      if (selPessoas) {
        for (var i = 0; i < selPessoas.options.length; i++) {
          if (selPessoas.options[i].text.indexOf(String(simTravelers)) > -1 || (simTravelers >= 5 && selPessoas.options[i].text.indexOf("5") > -1)) {
            selPessoas.selectedIndex = i;
            break;
          }
        }
      }

      var msgField = document.getElementById("leadMensagem");
      if (msgField) msgField.value = msg;

      var contatoSec = document.getElementById("contato");
      if (contatoSec) {
        contatoSec.scrollIntoView({ behavior: "smooth" });
      }

      var nomeInp = document.getElementById("leadNome");
      if (nomeInp) setTimeout(function () { nomeInp.focus(); }, 400);

      showToast("Configuração personalizada aplicada ao formulário de contato!", "success", "Proposta montada");
    });
  }

  if (btnSaveSimulation) {
    btnSaveSimulation.addEventListener("click", function () {
      var user = getCurrentUser();
      if (!user) {
        showToast("Faça login para salvar suas simulações no Painel do Viajante!", "info", "Identifique-se");
        openAuthDialog("login");
        return;
      }

      var totalVal = document.getElementById("simTotalPrice") ? document.getElementById("simTotalPrice").textContent : "R$ 0";
      var hotelLabel = simHotelTier === "boutique" ? "Pousada Charme" : simHotelTier === "luxo" ? "Suíte Luxo" : "Pousada Padrão";

      var simObj = {
        id: Date.now(),
        destinoId: activeDestino.id,
        destinoNome: activeDestino.nome + " (" + activeDestino.estado + ")",
        viajantes: simTravelers,
        hotel: hotelLabel,
        total: totalVal,
        data: new Date().toLocaleDateString("pt-BR")
      };

      user.simulacoes = user.simulacoes || [];
      user.simulacoes.unshift(simObj);

      var users = getUsers();
      var idx = users.findIndex(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); });
      if (idx > -1) {
        users[idx].simulacoes = user.simulacoes;
        saveUsers(users);
      }
      setCurrentUser(user, !!localStorage.getItem(STORAGE_SESSION_KEY));

      showToast("Simulação para " + activeDestino.nome + " salva no seu painel!", "success", "Simulação guardada");
    });
  }

  /* ---------------------------------------------------------
     10. PAINEL DO VIAJANTE (DASHBOARD & PREFERÊNCIAS)
     --------------------------------------------------------- */

  var profileModal = document.getElementById("profileModal");
  var profileCloseBtn = document.getElementById("profileCloseBtn");
  var tabProfileQuotes = document.getElementById("tabProfileQuotes");
  var tabProfilePrefs = document.getElementById("tabProfilePrefs");
  var panelProfileQuotes = document.getElementById("panelProfileQuotes");
  var panelProfilePrefs = document.getElementById("panelProfilePrefs");
  var profileQuotesList = document.getElementById("profileQuotesList");
  var profileQuotesEmpty = document.getElementById("profileQuotesEmpty");

  function openProfileModal() {
    var user = getCurrentUser();
    if (!user) {
      showToast("Faça login para acessar seu painel exclusivo!", "info");
      openAuthDialog("login");
      return;
    }

    renderSavedQuotes();

    var prefEstilo = document.getElementById("prefEstilo");
    var prefRitmo = document.getElementById("prefRitmo");
    var prefRestricoes = document.getElementById("prefRestricoes");

    if (user.preferencias) {
      if (prefEstilo && user.preferencias.estilo) prefEstilo.value = user.preferencias.estilo;
      if (prefRitmo && user.preferencias.ritmo) prefRitmo.value = user.preferencias.ritmo;
      if (prefRestricoes && user.preferencias.restricoes) prefRestricoes.value = user.preferencias.restricoes;
    }

    switchProfileTab("quotes");

    if (typeof profileModal.showModal === "function") {
      profileModal.showModal();
    } else {
      profileModal.setAttribute("open", "true");
    }
  }

  function closeProfileModal() {
    if (!profileModal) return;
    if (typeof profileModal.close === "function" && profileModal.open) {
      profileModal.close();
    } else {
      profileModal.removeAttribute("open");
    }
  }

  if (profileCloseBtn) profileCloseBtn.addEventListener("click", closeProfileModal);

  function switchProfileTab(tab) {
    if (tabProfileQuotes) tabProfileQuotes.classList.toggle("is-active", tab === "quotes");
    if (tabProfilePrefs) tabProfilePrefs.classList.toggle("is-active", tab === "prefs");
    if (panelProfileQuotes) panelProfileQuotes.style.display = tab === "quotes" ? "block" : "none";
    if (panelProfilePrefs) panelProfilePrefs.style.display = tab === "prefs" ? "block" : "none";
  }

  if (tabProfileQuotes) tabProfileQuotes.addEventListener("click", function () { switchProfileTab("quotes"); });
  if (tabProfilePrefs) tabProfilePrefs.addEventListener("click", function () { switchProfileTab("prefs"); });

  function renderSavedQuotes() {
    if (!profileQuotesList || !profileQuotesEmpty) return;
    var user = getCurrentUser();
    var quotes = user && user.simulacoes ? user.simulacoes : [];

    profileQuotesList.innerHTML = "";

    if (quotes.length === 0) {
      profileQuotesEmpty.hidden = false;
      return;
    }
    profileQuotesEmpty.hidden = true;

    quotes.forEach(function (q) {
      var card = document.createElement("div");
      card.className = "profile-card";
      card.innerHTML =
        '<div class="profile-card__info">' +
        "<h4>" + escapeHtml(q.destinoNome) + "</h4>" +
        "<p>" + escapeHtml(q.viajantes) + " pessoa(s) · " + escapeHtml(q.hotel) + " · Salvo em " + escapeHtml(q.data) + "</p>" +
        '<strong style="color: var(--clay-600); font-size: var(--fs-md);">' + escapeHtml(q.total) + "</strong>" +
        "</div>" +
        '<div style="display: flex; gap: var(--sp-2); align-items: center;">' +
        '<button class="btn btn--primary btn--sm" type="button" data-apply-quote="' + q.id + '">Pedir Roteiro</button>' +
        '<button class="icon-btn" type="button" data-delete-quote="' + q.id + '" aria-label="Remover simulação">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>' +
        "</button>" +
        "</div>";

      card.querySelector("[data-apply-quote]").addEventListener("click", function () {
        closeProfileModal();
        preSelectLeadDestino(q.destinoNome);
        var msgField = document.getElementById("leadMensagem");
        if (msgField) {
          msgField.value = "Gostaria de contratar minha simulação salva: " + q.destinoNome + " para " + q.viajantes + " pessoa(s) no valor de " + q.total + ".";
        }
        var contatoSec = document.getElementById("contato");
        if (contatoSec) contatoSec.scrollIntoView({ behavior: "smooth" });
      });

      card.querySelector("[data-delete-quote]").addEventListener("click", function () {
        user.simulacoes = user.simulacoes.filter(function (item) { return item.id !== q.id; });
        var users = getUsers();
        var idx = users.findIndex(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); });
        if (idx > -1) {
          users[idx].simulacoes = user.simulacoes;
          saveUsers(users);
        }
        setCurrentUser(user, !!localStorage.getItem(STORAGE_SESSION_KEY));
        renderSavedQuotes();
        showToast("Simulação removida.", "info");
      });

      profileQuotesList.appendChild(card);
    });
  }

  if (panelProfilePrefs) {
    panelProfilePrefs.addEventListener("submit", function (e) {
      e.preventDefault();
      var user = getCurrentUser();
      if (!user) return;

      user.preferencias = {
        estilo: document.getElementById("prefEstilo").value,
        ritmo: document.getElementById("prefRitmo").value,
        restricoes: (document.getElementById("prefRestricoes").value || "").trim()
      };

      var users = getUsers();
      var idx = users.findIndex(function (u) { return u.email.toLowerCase() === user.email.toLowerCase(); });
      if (idx > -1) {
        users[idx].preferencias = user.preferencias;
        saveUsers(users);
      }
      setCurrentUser(user, !!localStorage.getItem(STORAGE_SESSION_KEY));

      showToast("Preferências de viagem salvas com sucesso!", "success", "Perfil atualizado");
    });
  }

  /* ---------------------------------------------------------
     11. DIFERENCIAIS (FEATURES)
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
     12. ROTEIRO CHAPADA & ACORDEÃO
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
     13. SLIDER DE DEPOIMENTOS COM GESTOS TOUCH (RESPONSIVO)
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
     14. SEÇÃO DE PERGUNTAS FREQUENTES (FAQ)
     --------------------------------------------------------- */

  function renderFaq() {
    var faqList = document.getElementById("faqList");
    if (!faqList || !DATA.FAQ) return;

    faqList.innerHTML = "";

    DATA.FAQ.forEach(function (item, index) {
      var li = document.createElement("li");
      li.className = "faq-item";

      var isOpen = index === 0;
      var panelId = "faq-panel-" + index;

      li.innerHTML =
        '<button class="faq-trigger" type="button" aria-expanded="' + (isOpen ? "true" : "false") + '" aria-controls="' + panelId + '">' +
        "<span>" + escapeHtml(item.pergunta) + "</span>" +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
        "</button>" +
        '<div class="faq-panel' + (isOpen ? " is-open" : "") + '" id="' + panelId + '" role="region">' +
        "<div><p>" + escapeHtml(item.resposta) + "</p></div>" +
        "</div>";

      var trigger = li.querySelector(".faq-trigger");
      var panel = li.querySelector(".faq-panel");

      trigger.addEventListener("click", function () {
        var expanded = trigger.getAttribute("aria-expanded") === "true";
        trigger.setAttribute("aria-expanded", String(!expanded));
        panel.classList.toggle("is-open", !expanded);
      });

      faqList.appendChild(li);
    });
  }

  /* ---------------------------------------------------------
     15. FORMULÁRIO DA HERO & FORMULÁRIO DE CONTATO (LEAD)
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
        if (destino && destinosSearchInput) {
          destinosSearchInput.value = destino.split(" — ")[0];
          searchQuery = destino.split(" — ")[0];
          renderDestinos();
        }
        if (searchFeedback) searchFeedback.textContent = "";
      }, 350);
    });
  }

  // Máscara dinâmica de telefone
  var leadTel = document.getElementById("leadTel");
  if (leadTel) {
    leadTel.addEventListener("input", function (e) {
      var v = e.target.value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      if (v.length > 6) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2, 7) + "-" + v.slice(7);
      } else if (v.length > 2) {
        v = "(" + v.slice(0, 2) + ") " + v.slice(2);
      } else if (v.length > 0) {
        v = "(" + v;
      }
      e.target.value = v;
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
      var tel = (document.getElementById("leadTel") ? document.getElementById("leadTel").value : "").trim();
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
      if (tel && tel.replace(/\D/g, "").length < 10) {
        setFieldError("leadTel", "Informe um telefone válido com DDD (ex.: 11 98888-7777).");
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
        showToast("Roteiros solicitados com sucesso! Verifique seu e-mail e WhatsApp.", "success", "Tudo pronto!");
      }, 900);
    });
  }

  /* ---------------------------------------------------------
     16. INICIALIZAÇÃO GERAL
     --------------------------------------------------------- */

  function init() {
    initTheme();

    var anoEl = document.getElementById("anoAtual");
    if (anoEl) anoEl.textContent = new Date().getFullYear();

    renderDestinos();
    renderFeatures();
    renderRoteiro();
    initSlider();
    renderFaq();

    updateAuthUI();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
