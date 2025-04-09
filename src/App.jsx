import './App.css';
import Main from './pages/Main';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from "./services/redux/userSlice";
import { useGetUserQuery } from './services/api/authApi';
import { skipToken } from '@reduxjs/toolkit/query';

function App() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.users.user) || localStorage.getItem("user");
  const {data:user, isLoading, isSuccess, isError} = useGetUserQuery(
    userId ? { userId } : skipToken
  );

  useEffect(()=>{
    if(isSuccess){
      dispatch(userActions.setUser(user));
    }
  },[isLoading]);

  return (
    <>
      <Main/>
    </>
  )
}

export default App
