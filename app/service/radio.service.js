var app = require("../../express");
var radioModel = require("../model/radio/radio.model");
var request = require("request");
var parser = require("jssoup").default;

app.get("/api/tracks/:cid", function (req, res) {
    radioModel.tracks(req.params.cid).then(function (tracks) {
        res.json(tracks);
    });
});

app.get("/api/update/:cid", function (req, res) {
    request("http://www.dogstarradio.com/search_playlist.php?artist=&title=&channel=" + req.params.cid + "&month=&date=&shour=&sampm=&stz=&ehour=&eampm=", function (error, result, body) {
        var html = new parser(body);
        var tables = html.findAll("table");
        if (tables.length < 2) {
            res.json({error:"no songs in webpage"});
            return;
        }
        var table = tables[1].findAll("tr");
        var songs = [];
        for (var s in table) {
            var song = table[s];
            if (s > 2) {
                var artist = song.findAll("td")[1].getText()
                var title = song.findAll("td")[2].getText()
                songs.push({artist:artist, title:title});
            }
        }
        if (songs.length == 0) {
            res.json({error:"song list was empty"});
        }
        songs.splice(-1,1);

        getAppleMusicAllSongs(0, songs, function (songs) {
            var filtered = songs.filter(function (song) {
                return song.title != "null" && song.hasOwnProperty("trackId");
            });
            // radioModel.createListing("station", req.params.cid, filtered);
            radioModel.find({channel:req.params.cid}).then(function (d) {
                if (d.length === 0) {
                    radioModel.create({channel:req.params.cid, name:"station", tracks:filtered}).then(function () {
                        res.json(filtered);
                    });
                } else {
                    radioModel.findByIdAndUpdate(d[0].id, {channel:req.params.cid, tracks:filtered}).then(function () {
                        res.json(filtered);
                    });
                }
            });
        });
    })
});

function getAppleMusicAllSongs(songIndex, completed, callback) {
    if (songIndex == completed.length) {
        callback(completed)
        return;
    }

    getAppleMusicData(completed[songIndex], function (song) {
        getAppleMusicAllSongs(songIndex + 1, completed, callback);
    });
}

function getAppleMusicData(song, callback) {
    var term = song.title.replace(" ", "+");
    var artist = song.artist.replace(" ", "+");
    var url = "https://itunes.apple.com/search?term=" + term + "+" + artist + "&entity=song";

    request(url, function (error, result, body) {
        var u = url;
        if (body.length > 0) {
            try {
                var results = JSON.parse(body).results;

                if (results.length > 0) {
                    var re = results[0];
                    song.trackId = re.trackId;
                    song.title = re.trackName;
                    song.artist = re.artistName;
                }
            } catch (e) {
                res.send(u);
            }
        }
        callback(song);
    })
}

app.get("/api/station-titles", function (req, res) {
    request("http://www.dogstarradio.com/search_playlist.php", function (error, result, body) {
        var html = new parser(body);
        var tables = html.findAll("table");
        if (tables.length == 0) {
            res.json({error:"site is down"})
        }
        var titles = tables[0].findAll("tr")[3].findAll("select")[0].findAll("option");
        var listing = {};
        var head = titles[1];
        for (var t in titles) {
            if (t < titles.length - 1) {
                var title = head.contents[0]._text;
                var ts = title.split(" - ");
                listing[parseInt(ts[0])] = ts[1];
                head = head.contents[1];
            }
        }

        res.json(listing);
    })
});