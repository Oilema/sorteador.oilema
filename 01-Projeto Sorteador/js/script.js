/* ============================================================
   SORTEADOR OILEMA — HERO LANDING PAGE
   jQuery Animations & Interactions
   ============================================================ */

$(function () {

  /* ---- Loader ---- */
  $(window).on('load', function () {
    $('.loader-wrapper').addClass('hidden');
  });
  setTimeout(function () { $('.loader-wrapper').addClass('hidden'); }, 2500);

  /* ---- Hero entrance ---- */
  setTimeout(function () { $('.hero-content').addClass('show'); }, 400);

  /* ---- Data/Hora Brasília (UTC-3) ---- */
  function updateDateTime() {
    var now = new Date();
    var options = {
      timeZone: 'America/Sao_Paulo',
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    var formatted = now.toLocaleString('pt-BR', options);
    // Capitaliza primeira letra
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    $('#datetime-brasilia').html('<strong>' + formatted + '</strong>');
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
  setTimeout(function () { $('.hero-visual').addClass('show'); }, 650);
  setTimeout(function () { $('.hero-info-bar').addClass('show'); }, 1100);

  /* ---- Navbar scroll ---- */
  $(window).on('scroll', function () {
    $(this).scrollTop() > 50
      ? $('.navbar').addClass('scrolled')
      : $('.navbar').removeClass('scrolled');
  });

  /* ---- Hamburger ---- */
  $('.hamburger').on('click', function () {
    $(this).toggleClass('active');
    $('.nav-links').toggleClass('open');
  });

  $('.nav-links a').on('click', function () {
    $('.hamburger').removeClass('active');
    $('.nav-links').removeClass('open');
  });

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.navbar').length) {
      $('.hamburger').removeClass('active');
      $('.nav-links').removeClass('open');
    }
  });

  /* ---- Smooth scroll ---- */
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var t = $(this).attr('href');
    if (t === '#') return;
    var $t = $(t);
    if ($t.length) {
      $('html, body').animate({ scrollTop: $t.offset().top - 80 }, 700);
    }
  });

  /* ---- Counter animation ---- */
  var counted = false;
  function animateCounters() {
    if (counted) return;
    counted = true;
    $('.hero-stat-number[data-count]').each(function () {
      var $el = $(this);
      var target = parseInt($el.data('count'));
      var suffix = $el.data('suffix') || '';
      var start = performance.now();
      var dur = 1800;
      (function step(now) {
        var p = Math.min((now - start) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        $el.text(Math.floor(ease * target) + suffix);
        if (p < 1) requestAnimationFrame(step);
        else $el.text(target + suffix);
      })(start);
    });
  }
  setTimeout(animateCounters, 900);

  /* ---- Mockup number - sorteia com base nos inputs ---- */
  var sorteados = [];

  function rollNumber() {
    var min = parseInt($('#minVal').val()) || 0;
    var max = parseInt($('#maxVal').val()) || 100;

    if (min > max) {
      alert('O número mínimo (' + min + ') não pode ser maior que o máximo (' + max + ')!');
      return;
    }

    // Verifica se todos já foram sorteados
    var totalPossivel = max - min + 1;
    // Filtra só os que estão no intervalo atual
    var sorteadosNoIntervalo = sorteados.filter(function (n) { return n >= min && n <= max; });
    if (sorteadosNoIntervalo.length >= totalPossivel) {
      alert('Todos os números do intervalo ' + min + ' a ' + max + ' já foram sorteados!');
      return;
    }

    // Gera número que ainda não foi sorteado
    var target;
    do {
      target = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (sorteados.indexOf(target) !== -1);

    sorteados.push(target);

    var $n = $('.mockup-result-number');
    var i = 0;
    var iv = setInterval(function () {
      $n.text(Math.floor(Math.random() * (max - min + 1)) + min);
      if (++i >= 14) {
        clearInterval(iv);
        $n.text(target);
        $n.css('transform', 'scale(1.12)');
        setTimeout(function () { $n.css('        .nav-logo img { height:38px; }', 'scale(1)'); }, 200);

        // Atualiza histórico
        atualizarHistorico();
      }
    }, 55);
  }

  function atualizarHistorico() {
    var $lista = $('#historicoLista');
    $lista.empty();
    for (var j = 0; j < sorteados.length; j++) {
      $lista.append(
        '<span class="historico-item">' +
          '<span class="ordem">' + (j + 1) + 'º</span> ' + sorteados[j] +
        '</span>'
      );
    }
    $('#contagem').text(sorteados.length);
    // Scroll para o final
    $lista.scrollTop($lista[0].scrollHeight);
  }

  // Limpar histórico
  $('#limparHistorico').on('click', function () {
    if (sorteados.length === 0) return;
    if (!confirm('Deseja realmente limpar o histórico de sorteios?')) return;
    sorteados = [];
    $('#historicoLista').html('<span class="historico-vazio">Nenhum sorteio realizado ainda</span>');
    $('#contagem').text('0');
    $('.mockup-result-number').text('—');
  });

  $('.mockup-btn').on('click', rollNumber);

  /* ---- Parallax orbs on mouse ---- */
  if (window.innerWidth > 768) {
    $(document).on('mousemove', function (e) {
      var mx = (e.clientX / window.innerWidth - .5) * 2;
      var my = (e.clientY / window.innerHeight - .5) * 2;
      $('.hero-orb-1').css('transform', 'translate(' + (mx * 22) + 'px,' + (my * 22) + 'px)');
      $('.hero-orb-2').css('transform', 'translate(' + (mx * -16) + 'px,' + (my * -16) + 'px)');
      $('.hero-orb-3').css('transform', 'translate(' + (mx * 10) + 'px,' + (my * 10) + 'px)');
    });
  }

  /* ---- Typing effect ---- */
  var phrases = [
    'Sorteio Justo e Transparente.',
    'Boa Sorte! 🍀',
    'Sua chance de ganhar começa aqui!',
  ];
  var pi = 0, ci = 0, deleting = false;
  var $tp = $('.typing-text');

  function typeLoop() {
    if (!$tp.length) return;
    var curr = phrases[pi];
    if (deleting) { ci--; } else { ci++; }
    $tp.text(curr.substring(0, ci));

    var speed = deleting ? 28 : 65;
    if (!deleting && ci === curr.length) { speed = 2200; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; speed = 400; }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

});
