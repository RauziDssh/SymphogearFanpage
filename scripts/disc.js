var BT = React.createClass({
  render:function(){
    var btnstyle = {
      color: "red"
    };
    return (
      <button className="btn btn-default" style={btnstyle}/>
    );
  }
});

var songdata;
$(() => {
    $.ajaxSetup({ async: false });
    $.getJSON("data.json",(data) => {songdata = data;});
    console.log(songdata);
    $.ajaxSetup({ async: true });
})

var SongContainer = React.createClass({
    render: () => {
        var SongList = songdata.map((isong) => {
            return (
                <Song data = {isong}></Song>
            );
        });        
        return(
            <div className = "container">
                <ul className="list-group">
                    <li className="list-group-item row">
                        <div className="col-xs-6">TITLE</div>
                        <div className="col-xs-4">SINGER</div>
                        <div className="col-xs-1">SEASON</div>
                    </li>
                </ul>
                <ul className="list-group">
                    {SongList}
                </ul>
            </div>
        );
    }
});

var Song = React.createClass({
    render: function() {
        var tstyle = {
            color: "white"
        };
        return (
            <li className="list-group-item row" style={tstyle}>
                <div className="col-xs-6">{this.props.data.song_title}</div>
                <div className="col-xs-4">{this.props.data.singer.join(",")}</div>
                <div className="col-xs-1">{this.props.data.series}</div>
            </li>
        );
    }
});

React.render(
    <div>
        <SongContainer></SongContainer>
    </div>,
    document.getElementById('ikusaba-inner')
);