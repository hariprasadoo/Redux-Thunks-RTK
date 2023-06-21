export {}
declare global { 
  interface IPanel {
    children: React.ReactNode;
    className: ReactDOM
    onClick?: () => void

  }
  interface IExpPanel {
    children: React.ReactNode;
    header: ReactDOM
    onClick?: () => void

  }
  interface IAlbum{
    user:{
      "name": string,
      "email": string,
      "password": string,
      "id": number
    }
  }
  
}