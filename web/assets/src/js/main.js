if (document.documentElement.clientWidth > 640) {
  var fileref=document.createElement('script');
  fileref.setAttribute("type","text/javascript");
  fileref.setAttribute("src", "./assets/dist/lines.min.js");

  document.body.appendChild(fileref);
}