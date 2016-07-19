function deadoralive(id){
    var color = $("#"+id).css("background-color");
    if(color == "rgb(0, 0, 0)"){
      $("#"+id).css("background-color","red")
    }else{
      $("#"+id).css("background-color","black")
    }
  }

class Life extends React.Component{
  constructor(props){
    super(props);
    this.t=900;
    this.randoms = [];
    for(var i=0;i<100;i++){
      var rand = "#cube" + Math.floor(Math.random()*901);
      this.randoms.push(rand);
    }
    this.state = {
      counter: 0
    }
    this.theGame = this.theGame.bind(this);
    this.divs = this.divs.bind(this);
    var self = this;
    setTimeout(function(){
      self.randoms.forEach(function(name){
      $(name).css("background-color","red");        
    })
      self.theGame();
    }, 100)

  }
  
isItBlack(color){
  if(color == "rgb(0, 0, 0)"){
    return 0;
  }else{
    return 1;
  }
}
  
searchforlife(name){
  var self = this;
    var possibles = [-31,-30,-29,-1,1,29,30,31];
    var neighbours = 0;
  possibles.forEach(function(num){
    if((num+name)>=0 && (num+name)<900){
      var currentColor = $("#cube"+(name+num)).css("background-color");
    neighbours+=self.isItBlack(currentColor);
    }else if((num+name)<0){
      var currentColor = $("#cube"+(900-name)).css("background-color");
    neighbours+=self.isItBlack(currentColor);
    }else if((num+name)>=900){
      var currentColor = $("#cube"+(899-name)).css("background-color");
    neighbours+=self.isItBlack(currentColor);
    }
  })
    return neighbours;    
  }
  
  theGame(){
    var self=this;
    var toLive = [],
        toDie = [];
    function search(){
      toLive = [];
        toDie = [];
      for(var z=0;z<900;z++){
      var currID = "cube" + z;
      var color = $("#"+currID).css("background-color");
      if(color === "rgb(0, 0, 0)"){
        //check if there are enough neighbours to be born
        if(self.searchforlife(z)===3){
          toLive.push(currID)
        }
      }else{
        //check if the current block should die, or can be Stayin' Alive
        if(self.searchforlife(z)<2){
          //dies
          toDie.push(currID);
        }else if(self.searchforlife(z)>3){
          //also dies
          toDie.push(currID);
        }
      }
    } 
    }
    
    function destroy(){
      toLive.forEach(function(name){
        $("#"+name).css("background-color","red")
      });
      toDie.forEach(function(name){
        $("#"+name).css("background-color","black")
      })
      self.setState({
            counter: self.state.counter + 1
        });
    }
    
    var ticking = setInterval(function(){
      search();
      destroy();
    },100);
    $("#stopper").on("click", function(e) {
    clearInterval(ticking);    
    e.preventDefault(); 
}); 
    $("#clear").on("click",function(e){
      clearInterval(ticking);
      e.preventDefault();
      toLive = [];
      toDie = [];
      self.setState({
            counter: 0
        });
      for(var i = 0;i<self.t;i++){
        var currID = "cube" + i;
        var color = $("#"+currID).css("background-color");
    if(color == "rgb(255, 0, 0)"){
      $("#"+currID).css("background-color","black")
    }
      }
    })
  }
  
  divs(){
      var blocks = [];             
      for(var i = 0;i<this.t;i++){
        var currID = "cube" + i;
        blocks.push("<div id=\""+currID+"\" class=\"field\" onclick=\"deadoralive(this.id)\"></div>")
      }
      return blocks.join("");
    }
  render(){
    return <div>
      <div className="menu text-center">
      <button className="btn btn-default" onClick={this.theGame}>start</button>
      <button id="stopper" className="btn btn-danger">stop</button>
      <button id="clear" className="btn btn-info">clear</button>
        <p className="counter">Generations: {this.state.counter}</p>
         </div>
      <div className="board" dangerouslySetInnerHTML={{__html: this.divs()}} />
     
      </div>
  }
}
ReactDOM.render(
  <Life />,
  document.getElementById('mainfield')
);
