const offers = [
  {
    id: 1,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-01.jpg`,
    category: `Premium`,
    name: `Beautiful &amp; luxurious apartment at great location`,
    price: {
      value: 200,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 52.403635,
      longitude: 4.918402
    }
  },
  {
    id: 2,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 10
      }
    },
    type: `Private room`,
    img: `img/room.jpg`,
    name: `Wood and stone place`,
    price: {
      value: 80,
      currency: `€`
    },
    rating: 80,
    bookmarked: false,
    location: {
      latitude: 52.338273,
      longitude: 4.902297
    }
  },
  {
    id: 3,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-02.jpg`,
    name: `Canal View Prinsengracht`,
    price: {
      value: 150,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 52.339455,
      longitude: 4.920547
    }
  },
  {
    id: 4,
    city: {
      name: `Amsterdam`,
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 10
      }
    },
    type: `Hotel`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 52.383731,
      longitude: 4.920490
    }
  },
  {
    id: 5,
    city: {
      name: `Brussels`,
      location: {
        latitude: 50.851309,
        longitude: 4.351718,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 100,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 50.865852,
      longitude: 4.417412
    }
  },
  {
    id: 6,
    city: {
      name: `Brussels`,
      location: {
        latitude: 50.851309,
        longitude: 4.351718,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 50.837783,
      longitude: 4.395461
    }
  },
  {
    id: 7,
    city: {
      name: `Brussels`,
      location: {
        latitude: 50.851309,
        longitude: 4.351718,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 400,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 50.841708,
      longitude: 4.361490
    }
  },
  {
    id: 8,
    city: {
      name: `Brussels`,
      location: {
        latitude: 50.851309,
        longitude: 4.351718,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 200,
      currency: `€`
    },
    rating: 95,
    bookmarked: false,
    location: {
      latitude: 50.875796,
      longitude: 4.363003
    }
  },
  {
    id: 9,
    city: {
      name: `Cologne`,
      location: {
        latitude: 50.930779,
        longitude: 6.938399,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 50.942134,
      longitude: 6.952892
    }
  },
  {
    id: 10,
    city: {
      name: `Cologne`,
      location: {
        latitude: 50.930779,
        longitude: 6.938399,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 50.936729,
      longitude: 6.977543
    }
  },
  {
    id: 11,
    city: {
      name: `Dusseldorf`,
      location: {
        latitude: 51.230569,
        longitude: 6.787428,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 51.233125,
      longitude: 6.760446
    }
  },
  {
    id: 12,
    city: {
      name: `Dusseldorf`,
      location: {
        latitude: 51.230569,
        longitude: 6.787428,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 100,
      currency: `€`
    },
    rating: 90,
    bookmarked: false,
    location: {
      latitude: 51.236359,
      longitude: 6.778507
    }
  },
  {
    id: 13,
    city: {
      name: `Dusseldorf`,
      location: {
        latitude: 51.230569,
        longitude: 6.787428,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 280,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 51.232364,
      longitude: 6.794059
    }
  },
  {
    id: 14,
    city: {
      name: `Hamburg`,
      location: {
        latitude: 53.552645,
        longitude: 9.966287,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 150,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 53.547479,
      longitude: 9.968873
    }
  },
  {
    id: 15,
    city: {
      name: `Hamburg`,
      location: {
        latitude: 53.552645,
        longitude: 9.966287,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-03.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 180,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 53.554221,
      longitude: 9.992588
    }
  },
  {
    id: 16,
    city: {
      name: `Paris`,
      location: {
        latitude: 48.856663,
        longitude: 2.351556,
        zoom: 10
      }
    },
    type: `Apartment`,
    img: `img/apartment-02.jpg`,
    category: `Premium`,
    name: `Nice, cozy, warm big bed apartment`,
    price: {
      value: 300,
      currency: `€`
    },
    rating: 100,
    bookmarked: false,
    location: {
      latitude: 48.845933,
      longitude: 2.357839
    }
  }
];

export default offers;
