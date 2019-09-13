function makeArtArray() {
  return [
    {
      artid: "820edbb8 - d3d0 - 11e9 - aa2e - 22000bcdf204",
      title: "Flatirons",
      description:
        "Flatirons - Boulder, CO.Acrylic paint with varnish, on Sandstone.",
      price: "90",
      height: "9",
      width: "12",
      availability: "available",
      image: "https://i.imgur.com/QAw7mKV.jpg"
    },
    {
      artid: "820ee752 - d3d0 - 11e9 - aa2e - 22000bcdf204",
      title: "Desert Season",
      description: "Priests Rock formation - UT.Acrylic paint with varnish.",
      price: "90",
      height: "9",
      width: "12",
      availability: "available",
      image: "https://i.imgur.com/cuJKeCa.jpg"
    },
    {
      artid: "820ee892 - d3d0 - 11e9 - aa2e - 22000bcdf204",
      title: "Even Bears Need Coffee",
      description: "Acrylic with varnish",
      price: "90",
      height: "11",
      width: "18",
      availability: "available",
      image: "https://i.imgur.com/ffitq55.jpg"
    }
  ];
}
function makeUsersArray() {
  return [
    {
      username: "kris",
      token: "a3JpczpsdWNreQ==",
      userid: 1,
      bio: "Born in Cincy"
    }
  ];
}

module.exports = {
  makeArtArray,
  makeUsersArray
};
