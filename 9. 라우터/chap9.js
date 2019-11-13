//한 페이지에서 버튼 클릭시 다른 게임들을 할 수 있게 바꿔보자
//npm i react-router      를 설치하자
//npm i react-router-dom   도 추가설치하자

//game.jsx에서  return에서   <BrowserRouter> 로 랜더링 할 코드를 감싸고 가상의 주소를 만들고(path)
//각 게임 component를 붙인다


//////////////////////////////////////////
//9-2. Link와 브라우저라우터
//
//리엑트 라우터는 1개 페이지이다! 그냥 리엑트만 알고 있는 가상의 페이지 이다
//그래서 <a href = 주소> 를 통해 접근하면 에러가 발생한다
//리엑트에선 <Link to="/game/lotto-generator">로또생성기</Link>  처럼 Link to = 주소   로 접근해야한다

//클라이언트 서버인 리엑트에서만 처리되기 때문에 브라우저(프론트)에서만 주소가 유효하고 서버는 1개 페이지가 
//돌아가는것과 같다

//Game.jsx의 리턴에서 첫번째 div는 공통으로 보여지는 부분 두번째 div는 컴포넌트가 불러와지는 부분(화면 바뀜)이다


////////////////////////////////////////////////
//9-3) 해시라우터, params, withRouter
//기존의 브라우저라우터를 사용할때 새로고침을 하면 localhost/game/lotto-generator 이런 주소로 서버가 요청을 받으면
//실제 서버라우터가 없기 때문에 요청에 대한 에러 메시지를 응답한다(물론 작동엔 문제없음)
//하지만 래시라우터를 사용하면 localhost#game/lotto-generator   #해쉬태크 뒤로는 서버가 인식을 하지 못하고
//리액트만 인식하기 때문에(서버는 localhost 로 인식함) 서버에 요청을 안하게 된다

//단점은 서버에서 요청을안 받기 때문에 검색엔진에서 검색시 검색이 안되는 단점이 있다
//(검색엔진은 서버에 요청되는 데이터만 확인한다)

//물론 서버에서 서버라우터로 /game/lotto-generator 를 만들어야 검색엔진에서 검색이 되는 것이다
//(서버에서는 라우터를 만들고 로그만 찍는 방식으로 해도 될것 같다)

//Game.jsx에서  <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} /> 로
//라우터 path를 하나로 만들어준다 :name으로 구분하게 만든다

//<Route을 통해 Game.jsx 와 GameMatcher.jsx를 연결했기 때문에 GameMatcher.jsx에서 
//this.props.location, this.props.history, this.props.match 로 Game.jsx 데이터에 접근할 수 있다
//(만약 Game.jsx 와 GameMatcher.jsx가 연결이 안되어 있다면 withRouter()를 아래와 같이 사용하여 연결시키면
// this.props.location, this.props.history, this.props.match을 사용할 수 있다)
import {withRouter} from 'react-router-dom';

class GameMatcher extends Component{
  render(){
    return ()
  }
}
export default withRouter(GameMatcher);  //withRouter(클래스)



////////////////////////////////////
//9-4) location, match, history
//history : 기존의 페이지를 넘나드는 내역을 가지고 있다. goback(), goforword() 같은 함수가 있어서 
//          함수를 사용하여 페이지를 컨트롤 할 수 있다
//          리액트 라우터의 함수를 위해 있다
//(리액트에서 주소는 가상이기 때문에 브라우저가 제공하는 함수를 쓰면 안되고 리액트에서 제공하는 함수를
//써야한다) 그래서 history 객체에 함수들이 있는 것이다
//match : 리액트 주소에 대한 부분이 나와있다(동적 주소 라우팅 params 에 대해 나옴)
//location : 리액트에서 설정한 주소부분이 나옴

//그래서 GameMatcher.jsx에서 아래와 같이 조건문으로 나눠서 게임 별로 가져오면 된다
if (this.props.match.params.name === 'number-baseball') {
  return <NumberBaseball />
} else if (this.props.match.params.name === 'rock-scissors-paper') {
  return <RSP />
} else if (this.props.match.params.name === 'lotto-generator') {
  return <Lotto />
}


//한개의 라우터로 여러개의 라우터를 쓰는 듯하게 만드는게 리액트이다
//history.pushState('','','/hello');  //이건(pushState()) 브라우저에서 제공한다(리엑트는 사용안됨)
//페이지를 바꾸지 않고 history API를 통해 브라우저 주소를 바꿀 수 있다(기존이 / 라면 /hello로 변경됨)
//pushState()를 리액트 라우터에서 활용한 것이다 
//하지만 이건 this.props.history 와는 다르다 
//this.props.history   리액트는 이렇게 사용해야한다 
//다만.. 브라우저에서 제공하는 pushState()는 리액트 라우터에서 활용한 것이지 리액트에서 사용은 위와 같이 해야한다!

//앞에서 말한 주소눈속임은 브라우저 API인 history.pushState('','','/hello');를 사용한 것이다
//그래서 서버에서 라우터 작업을 해줘야 검색엔진에 검색이 되게 할 수 있다


//////////////////////////////////////////////
//9-5) 쿼리스트링과 URLSearchParams
//노드에서 배운것이지만 주소에서 ?query=10&hello=zerocho&bye=react 처럼 쿼리스트링으로 나타낼수 있다(키=값 &로구분)
//(주소에 데이터를 전달하는 방법)
//queryString에 대한 정보는 location.search 부분에 있다(리액트에선 this.props를 앞에 붙인다)
//그래서 여기서 데이터를 가져와야 한다
let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
//쿼리스트링의 앞 ?를 짤라내고 URLSearchParams 객체 안에 넣어준다

console.log(urlSearchParams.get('hello')); 
//이런 방식으로 라우터를 파싱해줘야 한다 리액트 방식으로 만들고 서버에도 따로 구현해야하기 때문에 맛배기로 만든것이다


//////////////////////////////////////////
//9-6) render props, switch, exact
//Game.jsx에서 부모의 props를 자식에게 넘기는 방법에 대해 알아보자
//2가지 방법이 있다
//1)
<Route path="/game/:name" Component={() => <GameMatcher props='123456' />} />
//2) 이방식은 ...props로 부모의 것을 받아서 넘겨야 한다
<Route path="/game/:name" render={(props) => <GameMatcher {...props.abc} />} />

//props만 넘기는것이라면 2번의 방법이 좋다


//switch 사용방법
//아래와 같은 코드가 있을때 3개의 같은 것이 랜더링 된다
<div>
  <Route path="/" render={(props) => <GameMatcher {...props} />} />
  <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
  <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
</div>
//여기에 switch를 넣어주면 하나가 일치하면 나머지것들은 랜더링이 안된다(상위에 위치한 코드부터 확인해나감)
<div>
  <Switch>
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
  </Switch>
</div>
//위와 같이 감싸면 맨위에것 1개만 뜬다


//exact 사용방법
//정확한 path가 일치할때만 작동된다
<div>
  <Switch>
    <Route path="/" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
  </Switch>
</div>
//위의 상황에서 기본 주소가 /로 같으므로 맨위에것만 실행이 된다... 
//문제는 내가 원하는건 라우터별로 구별하고 싶은데 밑에것이 실행이 안된다
//이럴땐 exact를 사용해서 구별한다
<div>
  <Switch>
    <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
    <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} />
  </Switch>
</div>
//위와 같이 코드를 적으면  /는 정확한 path로 들어갈때는 위에것만 작동하게 된다
//내가 원하는 라우터별로 작업을 나눟 수 있다