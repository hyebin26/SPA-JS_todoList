const CollectionDone = (done) => {
  console.log(done);
  // data-id, add event
  return `
  <li class="collectionDoneList>
    <button class="collectionDoneBtn">✓</button>
    <p>${done}</p>
  </li>
  `;
};
export default CollectionDone;
