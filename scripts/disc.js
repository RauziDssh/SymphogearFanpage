var songdata;
var selectedsongdata;

Array.prototype.selectMany = function (fn) {
    return this.map(fn).reduce(function (x, y) { return x.concat(y); }, []);
};

$(() => {
    $.ajaxSetup({
        async: false
    });
    $.getJSON("data.json", (data) => {
        songdata = data;
    });
    $.ajaxSetup({
        async: true
    });
    selectedsongdata = songdata;
    var series = songdata.map((s) => s.series).filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    var singer = songdata.selectMany((x) => x.singer).filter(function (x, i, self) {
        return self.indexOf(x) === i;
    });
    
    series.forEach((e) => {
        $("#seasonselect").append("<option value="+e+">"+e+"</option>");
    });
    singer.forEach((e) => {
        $("#singerselect").append("<option value="+e+">"+e+"</option>");
    });
})

var Song = React.createClass({
    render: function () {
        var tstyle = {
            color: "white"
        };
        return ( < li className = "list-group-item row"
            style = {
                tstyle
            } >
            < div className = "col-xs-6" > {
                this.props.data.song_title
            } < /div> < div className = "col-xs-4" > {
            this.props.data.singer.join(",")
        } < /div> < div className = "col-xs-1" > {
        this.props.data.series
    } < /div> < /li >
);
}
});


var SongContainer = React.createClass({
            render: function () {
                var SongList = this.props.sdata.map((isong) => {
                        return ( < Song data = {
                                isong
                            } > < /Song>);
                        });
                    return ( < ul className = "list-group" > {
                            SongList
                        } < /ul>);
                    }
                });

            var rendering = function () {
                React.render( < div >
                    < SongContainer sdata = {
                        selectedsongdata
                    } > < /SongContainer> < /div > 
                    , document.getElementById('songlist')
                );
            }
            rendering();

            var song_singer = songdata.map((s) => {
                return s.id
            });
            var song_season = songdata.map((s) => {
                return s.id
            });

            $("#seasonselect").change(function () {
                var selected_season = $("#seasonselect").val();
                if (selected_season == "ALL") {
                    song_season = songdata.map((s) => {
                        return s.id
                    });
                } else {
                    song_season = songdata.filter((song, index) => {
                        var season = song.series;
                        if (season == selected_season) {
                            return true;
                        } else {
                            return false;
                        }
                    }).map((s) => {
                        return s.id
                    });
                }
                SetSongData();
            });

            $("#singerselect").change(function () {

                var selected_singer = $("#singerselect").val();
                if (selected_singer == "ALL") {
                    song_singer = songdata.map((s) => {
                        return s.id
                    });
                } else {
                    song_singer = songdata.filter((song, index) => {
                        var singers = song.singer;
                        if ($.inArray(selected_singer, singers) > -1 || selected_singer == singers) {
                            return true;
                        } else {
                            return false;
                        }
                    }).map((s) => {
                        return s.id
                    });
                }
                SetSongData();
            });

            var SetSongData = () => {
                selectedsongdata = songdata.filter((s, index) => {
                    if ($.inArray(s.id, song_singer) > -1 && $.inArray(s.id, song_season) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                });
                rendering();
            }