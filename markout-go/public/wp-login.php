
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <meta name="robots" content="noindex">
  <style>
    body { font-family: sans-serif; }
  </style>
</head>
<body>
<h1>Login</h1>
<p>Loading…</p>

<script>
// JS tarpit: burns bot CPU
let s = "";
for (let i = 0; i < 50_000_000; i++) {
  s += Math.random().toString(36).substring(2);
}
document.body.innerHTML += "<pre>" + s + "</pre>";
</script>

</body>
</html>
