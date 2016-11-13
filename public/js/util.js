function getParams() {
  var params = {};
  window.location.search.substr(1).split('&').forEach(
    function(item){ 
      var param = item.split('='); 
      params[param[0]] = param[1]; 
    }
  );

  return params;
}
