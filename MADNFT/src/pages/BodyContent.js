import React from 'react';
import styled from 'styled-components';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { InnerLayout } from '../Layouts';
import MainTitle from './MainTitle';
import MetaCheck from '../components/MetaCheck';
import Mint from '../components/MintForm';
import Import from './Import';
import Market from './Market';
import Random from './Random';
import GasTest from './GasTest';
import Send from './Send';
import Funding from './Funding';
import Mycollections from './Mycollections';
import FooterSection from './FooterSection';

function BodyContent() {
  return (
    <BodyContentStyled>
      <BrowserRouter>
        <InnerLayout>
          <MainTitle title={'Best of NFT'} subtitle={'All NFT'} />
          <MetaCheck />
          <Switch>
            <Route path="/" exact={true} />
            <Route path="/Mint" component={Mint} />
            <Route path="/Import" component={Import} />
            <Route path="/Send" component={Send} />
            <Route path="/Market" component={Market} />
            <Route path="/Random" component={Random} />
            <Route path="/Funding" component={Funding} />
            <Route path="/GasTest" component={GasTest} />
            <Route path="/Mycollections" component={Mycollections} />
          </Switch>
          <div className="sellercards"></div>
          <FooterSection />
        </InnerLayout>
      </BrowserRouter>
    </BodyContentStyled>
  );
}

const BodyContentStyled = styled.div`
  .sellercards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
    margin: 2rem 0;
  }
  background-color: #03091f;
`;
export default BodyContent;
