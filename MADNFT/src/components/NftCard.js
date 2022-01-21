export default function NftCard({ key, name, family, age, weight }) {
  // console.log(name);
  return (
    <li className="component component--nft_card" key={key}>
      <div>
        이름: {name}
        종류: {family}
        나이: {age}
        체중: {weight}
      </div>
    </li>
  );
}
