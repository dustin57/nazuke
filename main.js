'use strict'
{
  //スマホならタップ、pcならクリック
  const mytap = window.ontouchstart===null?"touchstart":"click";

  //どの処理をしているか（組み合わせ:a  アナグラム:b  ランダム:c）
  let playLabel;


  //*****組み合わせ********************

  import {frontHira,backHira,frontKata,backKata,frontAlf,backAlf} from './data.js';
  
  const combiBtn = document.getElementById('combiBtn');
  combiBtn.addEventListener(mytap, () => {
    const combiName = sanitize(document.querySelector('input[name="combiName"]').value);
    strCheck(combiName, areaA, "areaA", 'input[name="combiName"]');
    if (errorLabel) {
      return;
    }
    combi();
    modalOpen();
  });

  function combi() {
    let str = '';
    const lang1 = document.getElementsByName('lang1');
    for (let i = 0; i < lang1.length; i++) {
      if (lang1[i].checked) {
        str = lang1[i].value;
        break;
      }
    }

    modalReset();

    switch (str) {
      case 'hira':
        createCombi(frontHira, backHira);
        break;
      case 'kata':
        createCombi(frontKata, backKata);
        break;
      case 'alf':
        createCombi(frontAlf, backAlf);
        break;
      default:
        break;
    }

    playLabel = 'a';
  }

  function createCombi(front, back) {
    const combiName = sanitize(document.querySelector('input[name="combiName"]').value);
    for (let i = 0; i < 5; i++) {
      const li = document.createElement('li');
      li.textContent = front[Math.floor(Math.random() * front.length)] + combiName;
      resultArea.appendChild(li);
    }
    for (let i = 0; i < 5; i++) {
      const li = document.createElement('li');
      li.textContent = combiName + back[Math.floor(Math.random() * back.length)];
      resultArea.appendChild(li);
    }
  }






  //*****アナグラム*******************
  const anaBtn = document.getElementById('anaBtn');
  anaBtn.addEventListener(mytap, () => {
    const ana = sanitize(document.querySelector('input[name="anaName"]').value);
    strCheck(ana, areaB, "areaB", 'input[name="anaName"]');
    if (errorLabel) {
      return;
    }
    const splitedAna = ana.split('');

    modalReset();

    for (let i = 0; i < 10; i++) {
      shuffle(splitedAna);
      const resultAna = splitedAna.join('');
      const li = document.createElement('li');
      li.textContent = resultAna;
      resultArea.appendChild(li);
    }
    playLabel = 'b';
    modalOpen();
  });

  //シャッフル関数
  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }



  //*****ランダム*******************
  const hira = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽぁぃぅぇぉっゃゅょ';

  const kata = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂズデドバビブベボパピプペポァィゥェォッャュョヴ';

  const alf = 'abcdefghijklmnopqrstuvwxyz';

  const ranBtn = document.getElementById('ranBtn');
  ranBtn.addEventListener(mytap, () => {
    random();
  });

  function random() {
    let str = '';
    const lang2 = document.getElementsByName('lang2');
    for (let i = 0; i < lang2.length; i++) {
      if (lang2[i].checked) {
        str = lang2[i].value;
        break;
      }
    }

    modalReset();

    switch (str) {
      case 'hira':
        createRandom(hira);
        break;
      case 'kata':
        createRandom(kata);
        break;
      case 'alf':
        createRandom(alf);
        break;
      default:
        break;
    }

    playLabel = 'c';
    modalOpen();
  }

  //組み合わせをつくる
  function createRandom(lang) {
    const len = document.querySelector('select[name="ranName"]').value;
    let ranStr = '';
    for (let i = 0; i < 10; i++) {
      for(let i = 0; i < len; i++) {
        ranStr += lang[Math.floor(Math.random() * lang.length)];
      }
      const li = document.createElement('li');
      li.textContent = ranStr;
      resultArea.appendChild(li);
      ranStr = '';
    }
  }


  // *****共通************************

  //結果表示
  function appendResult (element) {
    while (resultArea.firstChild) {
      resultArea.removeChild(resultArea.firstChild);
    }
    for(let i = 0; i < 10; i++) {
      const li = document.createElement('li');
      li.textContent = element;
      element.appendChild(li);
      i++;
    }
  }

  //結果表示時のウィンドウと背景マスク
  const mask = document.getElementById('mask');
  const modal = document.getElementById('modal');
  const resultArea = document.getElementById('resultArea');

  //モーダルウィンドウの表示
  function modalOpen() {
    mask.classList.remove('hidden');
    modal.classList.remove('hidden');
  }

  //モーダルウィンドウの非表示
  function modalClose() {
    mask.classList.add('hidden');
    modal.classList.add('hidden');
  }

  //モーダルウィンドウの中身をリセット
  function modalReset() {
    while (resultArea.firstChild) {
      resultArea.removeChild(resultArea.firstChild);
    }
  }

  //もう一度つくる
  const remake = document.getElementById('remake');
  remake.addEventListener(mytap, () => {
    remakeResult();
  });

  function remakeResult () {
    switch (playLabel) {
      case 'a':
        combiBtn.click();
        break;
      case 'b':
        anaBtn.click();
        break;
      case 'c':
        ranBtn.click();
        break;
      default:
        break;
    }
  }


  //戻る
  const back = document.getElementById('back');
  back.addEventListener(mytap, () => {
    modalClose();
  });

  //ウィンドウ外をクリックで戻る
  mask.addEventListener(mytap, function(){ modalClose() }, false);

  //何も入力されていない時のエラー
  let errorLabel;
  function strCheck(name, area, id, inputName) {
    const input = document.querySelector(inputName);
    area = document.getElementById(id);
    while (area.childNodes[1]) {
      area.removeChild(area.childNodes[1]);
      input.classList.remove('error');
    }
    if (name.length == 0) {
      const p = document.createElement('p');
      p.textContent = '文字を入力してください';
      p.classList.add('red');
      area.appendChild(p);
      input.classList.add('error');
      errorLabel = true;
      return;
    }
    errorLabel = false;
  }

  //サニタイズ
  function sanitize(str) {
    return String(str).replace(/&/g,"&amp;")
      .replace(/"/g,"&quot;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;");
  }

  //スムーススクロール
  $(function(){
    $('a[href^=#]').click(function(){
        const speed = 500;
        const href= $(this).attr("href");
        const target = $(href == "#" || href == "" ? 'html' : href);
        const position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
  });

}
