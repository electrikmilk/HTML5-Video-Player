<style>
@import url(https://fonts.googleapis.com/css?family=Roboto:400,700,900);
html,
body {
	font-family: Roboto, sans-serif;
	-webkit-font-smoothing: antialiased;
	color: #333;
	font-size: 16px;
	line-height: 20px;
	background-color: #fff;
}

::selection {
	background: rgba(131, 174, 229, .5);
}

::-moz-selection {
	background: rgba(131, 174, 229, .5);
	/* Gecko Browsers */
}
input {
padding: 10px;
border: 1px solid #c7c7c7;
font-size: 16px;
outline: none;
}
button {
background-color: #ccc;
color: #222;
padding: 10px;
border: none;
font-size: 16px;
}
textarea {
padding: 10px;
width: 100%;
height: 100px;
font-size: 16px;
}
</style>

<!--Upload Form-->

<h3>Code to embed in your form:</h3>

<textarea onclick="this.focus();" readonly>
<iframe id="html5player" type="text/html" width="640" height="390" src="http://html5videoplayer.netai.net/watch?id=<?php echo $_GET['id']; ?>" frameborder="0"></iframe>
</textarea>