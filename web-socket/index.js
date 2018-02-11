const ws = new WebSocket('ws://188.166.46.38');
ws.binaryType = "arraybuffer";

const generator = generatoSequence();
generator.next();

ws.onopen = () => {
  ws.send('{ "name":"chelovekdrakon", "command": "challenge accepted" }');
}
ws.onmessage = (e) => {

  let data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

  console.log(data);
  generator.next(data);
}

function* generatoSequence() {
  let data = yield;
  let token = data.token;
  let next = data.next;

  data = yield ws.send(JSON.stringify({
    token: token,
    command: next
  }));
  let arr = data.task.values;
  let sign = data.task.sign;
  let res = arr.reduce((a, b) => eval(`${a}${sign}${b}`));

  data = yield ws.send(JSON.stringify({
    token: token,
    command: next,
    answer: res
  }));
  next = data.next;

  data = yield ws.send(JSON.stringify({
    token: token,
    command: next
  }));
  let bits = data.task.bits;

  let buffer = yield;
  arr = bits === 8 ? new Uint8Array(buffer) : new Uint16Array(buffer);
  res = arr.reduce((a, b) => a + b);

  data = yield ws.send(JSON.stringify({
    token: token,
    command: next,
    answer: res
  }));
  next = data.next;

  data = yield ws.send(JSON.stringify({
    token: token,
    command: next
  }));
}
