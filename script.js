const keyValue = [
  '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace',
  'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
  'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter',
  'Shift', '\\', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Up', '.Shift',
  'Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Ctrl', 'Left', 'Down', 'Right',
];

function print(event) {
  const char = keyValue.indexOf(event.key);
  if (char !== -1) {
    const pushKey = document.querySelector(`.keyboard__key:nth-child(${char + 1})`);
    pushKey.classList.add('keyboard__key--active');
    document.querySelector('.output').innerHTML += String.fromCharCode(event.keyCode).toLowerCase();
  }
}

function printVirtual(text) {
  const outText = document.querySelector('#output');
  switch (text) {
    case 'Tab':
      outText.innerHTML += '    ';
      break;
    case 'Space':
      outText.innerHTML += ' ';
      break;
    case 'Del':
      outText.innerHTML = '';
      break;
    case 'Backspace':
      outText.innerHTML = outText.innerHTML.substr(0, (outText.innerHTML).length - 1);
      break;
    default: {
      const char = keyValue.indexOf(text);
      if (char !== -1) {
        document.querySelector('.output').innerHTML += String.fromCharCode(text.charCodeAt()).toLowerCase();
      }
      break;
    }
  }
}
function init() {
  // Создание области вывода
  const out = document.createElement('textarea');
  out.className = 'output';
  out.setAttribute('id', 'output');
  document.body.append(out);

  // Создание "обертки-контейнера" для клавиатуры
  const board = document.createElement('div');
  board.className = 'keyboard';
  document.body.append(board);

  // Создание кнопок
  for (let i = 0; i < keyValue.length; i += 1) {
    const key = document.createElement('button');
    key.innerText = keyValue[i];
    key.className = 'keyboard__key';
    board.append(key);
    if (['Backspace', 'Enter', 'Shift', 'CapsLock'].indexOf(key.innerText) !== -1) key.classList.add('keyboard__key--wide');
    else if (key.innerText === 'Space') key.classList.add('keyboard__key--extra-wide');
  }

  document.querySelectorAll('.keyboard__key').forEach((element) => {
    element.addEventListener('mouseup', (event) => {
      printVirtual(event.target.textContent);
      element.classList.remove('keyboard__key--active');
    });
    element.addEventListener('mousedown', () => {
      element.classList.add('keyboard__key--active');
    });
  });
}


window.addEventListener('load', init);
document.addEventListener('keydown', print);
document.addEventListener('keyup', () => {
  document.querySelectorAll('.keyboard__key').forEach((element) => {
    if (element.innerText !== 'CapsLock') element.classList.remove('keyboard__key--active');
  });
});
