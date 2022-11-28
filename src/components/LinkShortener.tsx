import React, {useState} from 'react';
import {linkApi} from "../service/LinkService";
import {Button, TextField, Link} from "@mui/material";

const LinkShortener = () => {
  const [linkShortener] = linkApi.useUrlShortenerMutation()
  const [url, setUrl] = useState('')
  const [error, setError] = useState<null | string>(null)
  const [responseContent, setResponseContent] = useState<null | string>(null)
  const setUrlHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setUrl(e.currentTarget.value)
  const linkShortenerHandler = () => {
    linkShortener(url).then((res: any) => {
      if (res) {
        console.log(res)
        if (res.error.status) {
          res.error.originalStatus === 202 ? setResponseContent(res.error.data) : setError(res.error.data)
        } else if (res.error.message) {
          setError(res.error.message)
        } else if (res.data) {
          setResponseContent(res.data)
        }
      }
    })
  }
  return (
    <div>
      <h1 style={{fontFamily: 'roboto', textAlign: 'center'}}>Shorten ur Url!</h1>
      <div style={{margin: '0 auto', width: 320, display: 'flex', flexDirection: 'column'}}>
        <TextField
          value={url}
          onChange={setUrlHandler}
          label="Input ur url"
        ></TextField>
        <Button variant="outlined" onClick={linkShortenerHandler}>Shorten!</Button>
      </div>
      {error
        ? <h1 style={{fontFamily: 'roboto', textAlign: 'center'}}>{error}</h1>
        : responseContent &&
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
          <h1 style={{fontFamily: 'roboto', textAlign: 'center'}}>
            Now ur link looks like:</h1>
          <Link variant={'body2'} style={{fontFamily: 'roboto', fontSize: 30, textAlign: 'center'}} href={responseContent}>{responseContent}</Link>
        </div>
      }
    </div>
  );
};

export default LinkShortener;