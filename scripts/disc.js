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

React.render(
  <BT />,
  document.getElementById('ikusaba-inner')
);