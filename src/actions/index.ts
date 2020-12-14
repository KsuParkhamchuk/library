import { IRootState } from "../reducers"

const headerAuth = 'Basic aGVzZmludGVjaDo1ZThmMTAxOC1mNjVhLTRlMjAtYWU2OS0xZjE4MTJmNmY2Zjc=';

export const saveUser = (newUser: any) => {
  
  return (dispatch:any) => {
    return  fetch("http://192.168.100.18:8080/api/v1/public/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          localStorage.setItem("token_start_time", String(new Date()));
          localStorage.setItem("token_expires_time", res.expires_in);
          dispatch(registerUser(res));
        });
  }
}

const registerUser = (tokens:any) => ({
  type: 'REGISTER_USER',
  payload: tokens
})

export const loginUser = (user:any) => {
  return (dispatch:any) => {
    return fetch(`http://192.168.100.18:8080/api/v1/oauth/token?grant_type=password&scope=global&username=${user.login}&password=${user.password}`,{
      method: "POST",
      headers: {
        "authorization": headerAuth
      },
    })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          localStorage.setItem("token_start_time", String(new Date()));
          localStorage.setItem("token_expires_time", res.expires_in);
          dispatch(registerUser(res));
        });
  }
}

const isOAuthTokenExpired = () => {
  let currentTime = new Date();
  let tokenstartTime = Date.parse(localStorage.getItem('token_start_time') || '');
  return (currentTime.getTime() - tokenstartTime) < +localStorage.getItem('token_expires_time')!*1000;
}

const updateToken = () => {
  return (dispatch:any) => {
  return  fetch(`http://192.168.100.18:8080/api/v1/oauth/token?grant_type=refresh_token&scope=global&refresh_token=${localStorage.getItem('refresh_token')}`,{
      method: "POST",
      headers: {
        "authorization": headerAuth
      },
    })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          localStorage.setItem("token_start_time", String(new Date()));
          localStorage.setItem("token_expires_time", res.expires_in);
          dispatch(registerUser(res));
        });
      }
}

export const getSelectedDateImg = (selectedDate: string) => {
    return (dispatch: (action: any) => Promise<any>, getState: () => IRootState) => {
      return dispatch({
        type: 'GET_SELECTED_DATE_IMG',
        callAPI: 'https://api.nasa.gov/planetary/apod?api_key=s0Bgn85OLjsXTfgCmhRgAAiu5fjVJrh2KJ5lqeZ7&date='+ selectedDate
      })
    }
}

export const getImgs = (imgDate:string) => {
  return (dispatch: (action: any) => Promise<any>, getState: () => IRootState) => {
      return dispatch({
        type: 'GET_ALL_MONTH_IMG',
        callAPI: 'https://api.nasa.gov/planetary/apod?api_key=s0Bgn85OLjsXTfgCmhRgAAiu5fjVJrh2KJ5lqeZ7&date='+ imgDate,
      })
  }
}

export  const clearImgArray = () =>({
  type: 'CLEAR_ARRAY',
  payload: []
})


