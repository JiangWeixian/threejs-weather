const proxy = {
  'GET /proxy/fake': (req, res) => {
    res.json(
      Array(10)
        .fill(0)
        .map((_v, i) => i),
    )
  },
}

export default proxy
