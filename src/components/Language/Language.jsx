import React from 'react';
import styled from 'styled-components';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';

const Background = styled.span`
  background-color: #d9d9d9;
  border-radius: 5px;
  padding: 5px;
`;

function Language(props) {
  const language = props.language;
  const removeLanguage = props.removeLanguage;

  const onLanguageHandler = (language) => {
    removeLanguage(language);
  };
  return (
    <span style={{ marginRight: '15px' }}>
      <Background>{language}</Background>
      <IndeterminateCheckBoxIcon style={{ fill: '#979797' }} onClick={() => onLanguageHandler(language)} />
    </span>
  );
}

export default Language;
