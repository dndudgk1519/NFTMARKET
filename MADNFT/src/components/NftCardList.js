import React, { Component } from 'react';
import NftCard from '../components/NftCard';

class NftCardList extends Component {
  state = {};

  render() {
    const { NftCard } = this.props;
    return (
      NftCard &&
      NftCard.map(itemdata => {
        // console.log("itemdata", itemdata.name,
        //     itemdata.age,
        //     itemdata.weight,
        //     itemdata.family);
        return (
          <NftCard
            name={itemdata.name}
            family={itemdata.family}
            age={itemdata.age}
            weight={itemdata.weight}
          />
        );
      })
    );
  }
}
export default NftCardList;
