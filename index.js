var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

var connection = mysql.createConnection({
  host: 'db',
  user: process.env.DB_ENV_MYSQL_USER,
  password: process.env.DB_ENV_MYSQL_PASSWORD,
  database: process.env.DB_ENV_MYSQL_DATABASE 
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.post('/login', doLogin);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);

    console.log(msg);
    sendMessage(msg);
  });
});

http.listen(process.env.PORT, function(){
  console.log('listening on *:' + process.env.PORT);
});

function sendMessage(msg) {

    var sql = 'INSERT INTO messages SET ?';

    connection.query(sql, msg, function (err, rows, fields) {
        if (err) throw err

        sql = 'SELECT username FROM users WHERE id = ?';
        connection.query(sql, msg.user_id, function (err, rows, fields) {
            rows = rows.length > 0 ? rows[0] : rows;
            msg.from_username = rows.username;
            io.emit('chat receive ' + msg.dest_user_id, msg);
        });
    })

}

function doLogin(req, res) {
    var sql = 'SELECT id, username, first_name ' +
      'FROM users ' +
      'WHERE username = ? AND password = ?';

    var user = [req.body.username, req.body.password ];

    connection.query(sql, user, function (err, rows, fields) {
        if (err) console.log(err);

      var rows = rows.length > 0 ? rows[0] : rows;

      res.json(rows);
    })
}
