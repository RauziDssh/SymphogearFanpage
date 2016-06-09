var songdata;
var selectedsongdata;

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

var song_singer  = songdata.map((s) => {return s.id});
var song_season  = songdata.map((s) => {return s.id});
                    
$("#seasonselect").change(function () {
                var selected_season = $("#seasonselect").val();
                if (selected_season == "ALL") {
                    song_season = songdata.map((s) => {return s.id});
                } else {
                    song_season = songdata.filter((song, index) => {
                        var season = song.series;
                        if (season == selected_season) {
                            return true;
                        } else {
                            return false;
                        }
                    }).map((s) => {return s.id});
                }
    console.log(song_season);
    SetSongData();
});
                    
$("#singerselect").change(function () {
                
                var selected_singer = $("#singerselect").val();
                if (selected_singer == "ALL") {
                    song_singer = songdata.map((s) => {return s.id});
                } else {
                song_singer = songdata.filter((song, index) => {
                var singers = song.singer;
                if ($.inArray(selected_singer, singers) > -1 || selected_singer == singers) {
                    return true;
                } else {
                    return false;
                }
            }).map((s) => {return s.id});
        }
    console.log(song_singer);
    SetSongData();
});
                    
var SetSongData = () => {
    selectedsongdata = songdata.filter((s,index) => {
        if($.inArray(s.id, song_singer) > -1 && $.inArray(s.id, song_season) > -1){
            return true;
        }else{
            return false;
        }
    });
    //console.log(selectedsongdata);
    rendering();
}