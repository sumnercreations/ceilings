import { Injectable } from '@angular/core';

@Injectable()
export class MaterialsService {

  public seeyond_features: any = {
    '0': {
      'feature_type': 0,
      'name': 'linear-partition',
      'title': 'Freestanding Linear Partition',
      'image': '/assets/images/renderings/freestanding_linear_partition.png',
      'width': 96,
      'height': 72,
      'angle': '',
      'radius': '',
      'ceiling_length': '',
      'hardware': {
        '3-15-0842': {},
        '3-85-105': {},
        '3-85-106': {},
        '3-85-102': {} // zipties
      }
    },
   '1': {
      'feature_type': 1,
      'name': 'curved-partition',
      'title': 'Freestanding Curved Partition',
      'image': '/assets/images/renderings/freestanding_curved_partition.png',
      'width': 96,
      'height': 72,
      'radius': 60,
      'angle': '',
      'ceiling_length': '',
      'hardware': {
        '3-15-0842': {},
        '3-85-105': {},
        '3-85-106': {},
        '3-85-102': {} // zipties
      }
    },
   '2': {
      'feature_type': 2,
      'name': 'wall',
      'title': 'Wall Feature',
      'image': '/assets/images/renderings/wall.png',
      'width': 50,
      'height': 50,
      'radius': '',
      'angle': '',
      'ceiling_length': '',
      'hardware': {
        '3-15-1606': {},
        '3-85-104': {},
        '3-85-109': {}
      }
    },
   '3': {
      'feature_type': 3,
      'name': 'wall-to-ceiling',
      'title': 'Wall-to-Ceiling Feature',
      'image': '/assets/images/renderings/wall_to_ceiling.png',
      'width': 72,
      'height': 96,
      'angle': 90,
      'radius': '',
      'ceiling_length': 72,
      'hardware': {
        '3-15-1606': {},
        '3-85-104': {},
        '3-85-109': {},
        '3-85-107': {},
        '3-85-108': {},
        '3-85-105': {},
        '3-15-1674': {},
        '3-15-1675': {},
        '3-15-0842': {},
        '3-85-102': {} // zipties
      }
    },
    '4': {
      'feature_type': 4,
      'name': 'ceiling',
      'title': 'Ceiling Feature',
      'image': '/assets/images/renderings/ceiling.png',
      'width': 50,
      'height': 50,
      'radius': '',
      'angle': '',
      'ceiling_length': '',
      'hardware': {
        '3-85-107': {},
        '3-85-108': {},
        '3-85-105': {},
        '3-15-1674': {},
        '3-15-1675': {},
        '3-15-0842': {},
        '3-85-102': {} // zipties
      }
    },
  };

  public seeyond_felt_sheet_mapping: any = {
    'ebony': '0-51-800',
    'dark_gray': '0-51-801',
    'ore': '0-51-802',
    'nickel': '0-51-803',
    'zinc': '0-51-804',
    'burnt_umber': '0-51-805',
    'cashmere': '0-51-806',
    'cast': '0-51-807'
  }

  // 0 = court, 1 = cusp, 2 = kink, 3 = tilt, 4 = billow
  public seeyondPatternsArray = [
    'court',
    'cusp',
    'kink',
    'tilt',
    'billow'
  ]

  public seeyondMinMaxDimensions = {
    0: {
      inches: {
        widthMin: 50,
        widthMax: 240,
        heightMin: 50,
        heightMax: 84,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      },
      centimeters: {
        widthMin: 127,
        widthMax: 610,
        heightMin: 127,
        heightMax: 214,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      }
    },
    1: {
      inches: {
        widthMin: 50,
        widthMax: 240,
        heightMin: 50,
        heightMax: 84,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: 30,
        radiusMax: 300
      },
      centimeters: {
        widthMin: 127,
        widthMax: 610,
        heightMin: 127,
        heightMax: 214,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: 77,
        radiusMax: 762
      }
    },
    2: {
      inches: {
        widthMin: 50,
        widthMax: 480,
        heightMin: 50,
        heightMax: 480,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      },
      centimeters: {
        widthMin: 127,
        widthMax: 1220,
        heightMin: 127,
        heightMax: 1220,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      }
    },
    3: {
      inches: {
        widthMin: 50,
        widthMax: 480,
        heightMin: 50,
        heightMax: 480,
        ceilLengthMin: 50,
        ceilLengthMax: 144,
        radiusMin: null,
        radiusMax: null
      },
      centimeters: {
        widthMin: 127,
        widthMax: 1220,
        heightMin: 127,
        heightMax: 1220,
        ceilLengthMin: 127,
        ceilLengthMax: 366,
        radiusMin: null,
        radiusMax: null
      }
    },
    4: {
      inches: {
        widthMin: 50,
        widthMax: 480,
        heightMin: 50,
        heightMax: 480,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      },
      centimeters: {
        widthMin: 127,
        widthMax: 1220,
        heightMin: 127,
        heightMax: 1220,
        ceilLengthMin: null,
        ceilLengthMax: null,
        radiusMin: null,
        radiusMax: null
      }
    }
  }

  public toolsArray = [
    'rotate',
    'remove',
    'light',
    'vent',
    'sprinkler'
  ];

  public tilesArray = {
    tetria: {
      0: {
        image: '/assets/images/tiles/01.png',
        tile: '01',
        name: '01'
      },
      1: {
        image: '/assets/images/tiles/02.png',
        tile: '02',
        name: '02'
      },
      2: {
        image: '/assets/images/tiles/03.png',
        tile: '03',
        name: '03'
      },
      3: {
        image: '/assets/images/tiles/00.png',
        tile: '00',
        name: '00'
      }
    },
    clario: {
      0: {
        image: '/assets/images/baffles/baffle_24_x_48.png',
        tile: '48',
        name: '24x48'
      },
      1: {
        image: '/assets/images/baffles/baffle_24_x_24.png',
        tile: '24',
        name: '24x24'
      },
      2: {
        image: '/assets/images/tiles/00.png',
        tile: '00',
        name: '00'
      }
    },
    velo: {
      0: {
        image: '/assets/images/velo/concave.png',
        tile: 'concave',
        name: 'concave'
      },
      1: {
        image: '/assets/images/velo/convex.png',
        tile: 'convex',
        name: 'convex'
      }
    },
    hush: {
      0: {
        image: '',
        tile: '24',
        name: '24x24'
      }
    }
  };

  public materials = {
    felt: {
      sola: {
        0: {
          material: 'zinc',
          image: '/assets/images/materials/felt/sola/zinc.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        1: {
          material: 'nickel',
          image: '/assets/images/materials/felt/sola/nickel.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        2: {
          material: 'cashmere',
          image: '/assets/images/materials/felt/sola/cashmere.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        3: {
          material: 'burnt_umber',
          image: '/assets/images/materials/felt/sola/burnt_umber.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        4: {
          material: 'cast',
          image: '/assets/images/materials/felt/sola/cast.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        5: {
          material: 'ebony',
          image: '/assets/images/materials/felt/sola/ebony.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        6: {
          material: 'ruby',
          image: '/assets/images/materials/felt/sola/ruby.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        7: {
          material: 'aries',
          image: '/assets/images/materials/felt/sola/aries.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        8: {
          material: 'citrine',
          image: '/assets/images/materials/felt/sola/citrine.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        9: {
          material: 'oxford',
          image: '/assets/images/materials/felt/sola/oxford.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        10: {
          material: 'admiral',
          image: '/assets/images/materials/felt/sola/admiral.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        11: {
          material: 'hunter',
          image: '/assets/images/materials/felt/sola/hunter.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        12: {
          material: 'moon',
          image: '/assets/images/materials/felt/sola/moon.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        13: {
          material: 'mineral',
          image: '/assets/images/materials/felt/sola/mineral.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        14: {
          material: 'armor',
          image: '/assets/images/materials/felt/sola/armor.png',
          status: 'active',
          available_until: '',
          sheet_part_id: ''
        },
        15: {
          material: 'ore',
          image: '/assets/images/materials/felt/sola/ore.png',
          status: 'inactive',
          available_until: 'March 2019',
          sheet_part_id: ''
        },
        16: {
          material: 'dark-gray',
          image: '/assets/images/materials/felt/sola/dark-gray.png',
          status: 'inactive',
          available_until: 'March 2019',
          sheet_part_id: ''
        },
      },
      merino: {
        0: {
          material: 'milky-white',
          image: '/assets/images/materials/felt/merino/milky-white.png',
          hex: '#dfdee0',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        1: {
          material: 'heather-gray',
          image: '/assets/images/materials/felt/merino/heather-gray.png',
          hex: '#babbbe',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        2: {
          material: 'charcoal',
          image: '/assets/images/materials/felt/merino/charcoal.png',
          hex: '#445062',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        3: {
          material: 'heather-charcoal',
          image: '/assets/images/materials/felt/merino/heather-charcoal.png',
          hex: '#5e616d',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        4: {
          material: 'heather-black',
          image: '/assets/images/materials/felt/merino/heather-black.png',
          hex: '#353542',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        5: {
          material: 'black',
          image: '/assets/images/materials/felt/merino/black.png',
          hex: '#20232d',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        6: {
          material: 'taupe',
          image: '/assets/images/materials/felt/merino/taupe.png',
          hex: '#b7a7a3',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        7: {
          material: 'heather-taupe',
          image: '/assets/images/materials/felt/merino/heather-taupe.png',
          hex: '#b3aaa4',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        8: {
          material: 'putty',
          image: '/assets/images/materials/felt/merino/putty.png',
          hex: '#8e7476',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        9: {
          material: 'latte',
          image: '/assets/images/materials/felt/merino/latte.png',
          hex: '#a15532',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        10: {
          material: 'heather-dark-brown',
          image: '/assets/images/materials/felt/merino/heather-dark-brown.png',
          hex: '#54393a',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        11: {
          material: 'dark-brown',
          image: '/assets/images/materials/felt/merino/dark-brown.png',
          hex: '#382228',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        12: {
          material: 'red',
          image: '/assets/images/materials/felt/merino/red.png',
          hex: '#e20000',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        13: {
          material: 'crimson',
          image: '/assets/images/materials/felt/merino/crimson.png',
          hex: '#bf001f',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        14: {
          material: 'bordeaux',
          image: '/assets/images/materials/felt/merino/bordeaux.png',
          hex: '#700229',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        15: {
          material: 'raspberry-jam',
          image: '/assets/images/materials/felt/merino/raspberry-jam.png',
          hex: '#bb0058',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        16: {
          material: 'royal-purple',
          image: '/assets/images/materials/felt/merino/royal-purple.png',
          hex: '#481a6d',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        17: {
          material: 'midnight-blue',
          image: '/assets/images/materials/felt/merino/midnight-blue.png',
          hex: '#22234e',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        18: {
          material: 'peacock',
          image: '/assets/images/materials/felt/merino/peacock.png',
          hex: '#003363',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        19: {
          material: 'liberty-blue',
          image: '/assets/images/materials/felt/merino/liberty-blue.png',
          hex: '#005db0',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        20: {
          material: 'deep-turquoise',
          image: '/assets/images/materials/felt/merino/deep-turquoise.png',
          hex: '#006ecb',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        21: {
          material: 'platinum',
          image: '/assets/images/materials/felt/merino/platinum.png',
          hex: '#8a95a6',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        22: {
          material: 'sky-blue',
          image: '/assets/images/materials/felt/merino/sky-blue.png',
          hex: '#01a5d4',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        23: {
          material: 'teal',
          image: '/assets/images/materials/felt/merino/teal.png',
          hex: '#00a494',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        24: {
          material: 'hunter-green',
          image: '/assets/images/materials/felt/merino/hunter-green.png',
          hex: '#003b39',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        25: {
          material: 'avocado',
          image: '/assets/images/materials/felt/merino/avocado.png',
          hex: '#778a00',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        26: {
          material: 'clover-green',
          image: '/assets/images/materials/felt/merino/clover-green.png',
          hex: '#019a00',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        27: {
          material: 'goldenrod',
          image: '/assets/images/materials/felt/merino/goldenrod.png',
          hex: '#ffb300',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        28: {
          material: 'camel',
          image: '/assets/images/materials/felt/merino/camel.png',
          hex: '#dfa77b',
          status: 'active',
          availableUntil: '',
          partId: ''
        },
        29: {
          material: 'orange',
          image: '/assets/images/materials/felt/merino/orange.png',
          hex: '#ff6c00',
          status: 'active',
          availableUntil: '',
          partId: ''
        }
      },
    },
    varia: {
      color: {
        0: {material: 'bashful_r10', hex: '#E2A494', status: 'active', availableUntil: '', partId: ''},
        1: {material: 'coral_r11', hex: '#EDCAB3', status: 'active', availableUntil: '', partId: ''},
        2: {material: 'cosmetic_r12', hex: '#EED0B9', status: 'active', availableUntil: '', partId: ''},
        3: {material: 'nude_r13', hex: '#F4E2C9', status: 'active', availableUntil: '', partId: ''},
        4: {material: 'ginger_r14', hex: '#EDC19F', status: 'active', availableUntil: '', partId: ''},
        5: {material: 'salmon_r15', hex: '#E4A786', status: 'active', availableUntil: '', partId: ''},
        6: {material: 'sherbet_r16', hex: '#D2663F', status: 'active', availableUntil: '', partId: ''},
        7: {material: 'cranberry_r17', hex: '#C72F1D', status: 'active', availableUntil: '', partId: ''},
        8: {material: 'love_r18', hex: '#C5221C', status: 'active', availableUntil: '', partId: ''},
        9: {material: 'jello_r19', hex: '#BB241C', status: 'active', availableUntil: '', partId: ''},
        10: {material: 'gypsy_r20', hex: '#B03F1F', status: 'active', availableUntil: '', partId: ''},
        11: {material: 'strawberry_r21', hex: '#8D241E', status: 'active', availableUntil: '', partId: ''},
        12: {material: 'garnet_r22', hex: '#852426', status: 'active', availableUntil: '', partId: ''},
        13: {material: 'desire_r23', hex: '#922822', status: 'active', availableUntil: '', partId: ''},
        14: {material: 'radish_r24', hex: '#A72020', status: 'active', availableUntil: '', partId: ''},
        15: {material: 'sweetheart_r25', hex: '#A32023', status: 'active', availableUntil: '', partId: ''},
        16: {material: 'daredevil_r26', hex: '#B12020', status: 'active', availableUntil: '', partId: ''},
        17: {material: 'spunky_r27', hex: '#C32920', status: 'active', availableUntil: '', partId: ''},
        18: {material: 'rouge_r28', hex: '#BD2225', status: 'active', availableUntil: '', partId: ''},
        19: {material: 'gladiola_r29', hex: '#CB7177', status: 'active', availableUntil: '', partId: ''},
        20: {material: 'peony_r30', hex: '#E4C1BB', status: 'active', availableUntil: '', partId: ''},
        21: {material: 'petal_r31', hex: '#EAD2D3', status: 'active', availableUntil: '', partId: ''},
        22: {material: 'powder-puff_r32', hex: '#F0E5E2', status: 'active', availableUntil: '', partId: ''},
        23: {material: 'azalea_r33', hex: '#EAD4C8', status: 'active', availableUntil: '', partId: ''},
        24: {material: 'begonia_r34', hex: '#E8B6B0', status: 'active', availableUntil: '', partId: ''},
        25: {material: 'watermelon_r35', hex: '#DC8B8F', status: 'active', availableUntil: '', partId: ''},
        26: {material: 'dragonfruit_r36', hex: '#D46C74', status: 'active', availableUntil: '', partId: ''},
        27: {material: 'pomegranate_r37', hex: '#A1382E', status: 'active', availableUntil: '', partId: ''},
        28: {material: 'beet_r38', hex: '#67242A', status: 'active', availableUntil: '', partId: ''},
        29: {material: 'merlot_r39', hex: '#451A2E', status: 'active', availableUntil: '', partId: ''},
        30: {material: 'clementine_o07', hex: '#E09A20', status: 'active', availableUntil: '', partId: ''},
        31: {material: 'carnival_o08', hex: '#D98022', status: 'active', availableUntil: '', partId: ''},
        32: {material: 'oj_o09', hex: '#DC8B21', status: 'active', availableUntil: '', partId: ''},
        33: {material: 'festive_o10', hex: '#CF5F20', status: 'active', availableUntil: '', partId: ''},
        34: {material: 'chipotle_o11', hex: '#BF5721', status: 'active', availableUntil: '', partId: ''},
        35: {material: 'persimmon_o12', hex: '#CE5820', status: 'active', availableUntil: '', partId: ''},
        36: {material: 'jubilee_o13', hex: '#D7792B', status: 'active', availableUntil: '', partId: ''},
        37: {material: 'charmer_o14', hex: '#DF963B', status: 'active', availableUntil: '', partId: ''},
        38: {material: 'butternut_o15', hex: '#DF9620', status: 'active', availableUntil: '', partId: ''},
        39: {material: 'giraffe_o16', hex: '#C9992B', status: 'active', availableUntil: '', partId: ''},
        40: {material: 'curry_o17', hex: '#CE8827', status: 'active', availableUntil: '', partId: ''},
        41: {material: 'marmalade_o18', hex: '#D5994A', status: 'active', availableUntil: '', partId: ''},
        42: {material: 'shrimp_o19', hex: '#EDC28D', status: 'active', availableUntil: '', partId: ''},
        43: {material: 'mai-tai_o20', hex: '#DB8549', status: 'active', availableUntil: '', partId: ''},
        44: {material: 'punch_o21', hex: '#D67242', status: 'active', availableUntil: '', partId: ''},
        45: {material: 'paprika_o22', hex: '#B3381D', status: 'active', availableUntil: '', partId: ''},
        46: {material: 'butterscotch_y06', hex: '#CFAE61', status: 'active', availableUntil: '', partId: ''},
        47: {material: 'couscous_y07', hex: '#EBCD76', status: 'active', availableUntil: '', partId: ''},
        48: {material: 'gardenia_y08', hex: '#EEDB9F', status: 'active', availableUntil: '', partId: ''},
        49: {material: 'morning_y09', hex: '#F9EFC0', status: 'active', availableUntil: '', partId: ''},
        50: {material: 'daffodil_y10', hex: '#F3E6A4', status: 'active', availableUntil: '', partId: ''},
        51: {material: 'vitamin-c_y11', hex: '#F4E088', status: 'active', availableUntil: '', partId: ''},
        52: {material: 'taxicab_y12', hex: '#F0D059', status: 'active', availableUntil: '', partId: ''},
        53: {material: 'golden_y13', hex: '#DEC046', status: 'active', availableUntil: '', partId: ''},
        54: {material: 'squash_y14', hex: '#EDC742', status: 'active', availableUntil: '', partId: ''},
        55: {material: 'tiger_y15', hex: '#EAB51D', status: 'active', availableUntil: '', partId: ''},
        56: {material: 'pharaoh_y16', hex: '#EEC421', status: 'active', availableUntil: '', partId: ''},
        57: {material: 'sunnyside_y17', hex: '#F1CA45', status: 'active', availableUntil: '', partId: ''},
        58: {material: 'butter_y18', hex: '#F4E77E', status: 'active', availableUntil: '', partId: ''},
        59: {material: 'daisy_y19', hex: '#F1DD3A', status: 'active', availableUntil: '', partId: ''},
        60: {material: 'chirp_y20', hex: '#F4E445', status: 'active', availableUntil: '', partId: ''},
        61: {material: 'marigold_y21', hex: '#F4EC90', status: 'active', availableUntil: '', partId: ''},
        62: {material: 'springtime_y22', hex: '#F6F3B7', status: 'active', availableUntil: '', partId: ''},
        63: {material: 'camel_y23', hex: '#EBE2A0', status: 'active', availableUntil: '', partId: ''},
        64: {material: 'wafer_y24', hex: '#DDCD8C', status: 'active', availableUntil: '', partId: ''},
        65: {material: 'cider_y25', hex: '#CEBC6F', status: 'active', availableUntil: '', partId: ''},
        66: {material: 'syrup_y26', hex: '#907135', status: 'active', availableUntil: '', partId: ''},
        67: {material: 'glazed_g15', hex: '#EBEAD4', status: 'active', availableUntil: '', partId: ''},
        68: {material: 'pickle_g16', hex: '#EBE9C8', status: 'active', availableUntil: '', partId: ''},
        69: {material: 'lark_g17', hex: '#E2E1C5', status: 'active', availableUntil: '', partId: ''},
        70: {material: 'pear_g18', hex: '#E6E8D3', status: 'active', availableUntil: '', partId: ''},
        71: {material: 'cucumber_g19', hex: '#E4E7CC', status: 'active', availableUntil: '', partId: ''},
        72: {material: 'nomad_g20', hex: '#CECDB6', status: 'active', availableUntil: '', partId: ''},
        73: {material: 'chai_g21', hex: '#736633', status: 'active', availableUntil: '', partId: ''},
        74: {material: 'terrace_g22', hex: '#A99B5C', status: 'active', availableUntil: '', partId: ''},
        75: {material: 'swamp_g23', hex: '#BFB98A', status: 'active', availableUntil: '', partId: ''},
        76: {material: 'hickory_g24', hex: '#C4B944', status: 'active', availableUntil: '', partId: ''},
        77: {material: 'vegan_g25', hex: '#C9C641', status: 'active', availableUntil: '', partId: ''},
        78: {material: 'citron_g26', hex: '#DFDB54', status: 'active', availableUntil: '', partId: ''},
        79: {material: 'acre_g27', hex: '#C2CC54', status: 'active', availableUntil: '', partId: ''},
        80: {material: 'turtle_g28', hex: '#BACE4D', status: 'active', availableUntil: '', partId: ''},
        81: {material: 'guacamole_g29', hex: '#DDE187', status: 'active', availableUntil: '', partId: ''},
        82: {material: 'minnow_g30', hex: '#D9E3C3', status: 'active', availableUntil: '', partId: ''},
        83: {material: 'garden_g31', hex: '#E8EAA1', status: 'active', availableUntil: '', partId: ''},
        84: {material: 'sweet-pea_g32', hex: '#E6E99D', status: 'active', availableUntil: '', partId: ''},
        85: {material: 'moss_g33', hex: '#CBD58A', status: 'active', availableUntil: '', partId: ''},
        86: {material: 'marsh_g34', hex: '#B9C583', status: 'active', availableUntil: '', partId: ''},
        87: {material: 'rainforest_g35', hex: '#9AA26A', status: 'active', availableUntil: '', partId: ''},
        88: {material: 'basil_g36', hex: '#94A551', status: 'active', availableUntil: '', partId: ''},
        89: {material: 'apple_g37', hex: '#B3CA86', status: 'active', availableUntil: '', partId: ''},
        90: {material: 'rosemary_g38', hex: '#CDD498', status: 'active', availableUntil: '', partId: ''},
        91: {material: 'laurel_g39', hex: '#89AE6F', status: 'active', availableUntil: '', partId: ''},
        92: {material: 'cilantro_g40', hex: '#63924A', status: 'active', availableUntil: '', partId: ''},
        93: {material: 'tropical_g41', hex: '#6FAE45', status: 'active', availableUntil: '', partId: ''},
        94: {material: 'lawn_g42', hex: '#AECB76', status: 'active', availableUntil: '', partId: ''},
        95: {material: 'thyme_g43', hex: '#C8DA90', status: 'active', availableUntil: '', partId: ''},
        96: {material: 'zucchini_g44', hex: '#CBDCA5', status: 'active', availableUntil: '', partId: ''},
        97: {material: 'rivulet_g45', hex: '#9BB89E', status: 'active', availableUntil: '', partId: ''},
        98: {material: 'oregano_g46', hex: '#89B18C', status: 'active', availableUntil: '', partId: ''},
        99: {material: 'shamrock_g47', hex: '#65AF81', status: 'active', availableUntil: '', partId: ''},
        100: {material: 'lucky_g48', hex: '#5B957D', status: 'active', availableUntil: '', partId: ''},
        101: {material: 'isle_g49', hex: '#6B887A', status: 'active', availableUntil: '', partId: ''},
        102: {material: 'seine_g50', hex: '#98C8BC', status: 'active', availableUntil: '', partId: ''},
        103: {material: 'awash_g51', hex: '#CDE0CE', status: 'active', availableUntil: '', partId: ''},
        104: {material: 'pixie_g52', hex: '#9AC9C1', status: 'active', availableUntil: '', partId: ''},
        105: {material: 'capri_g53', hex: '#67B3AB', status: 'active', availableUntil: '', partId: ''},
        106: {material: 'persian_g54', hex: '#53AB9C', status: 'active', availableUntil: '', partId: ''},
        107: {material: 'kilt_g55', hex: '#30A08D', status: 'active', availableUntil: '', partId: ''},
        108: {material: 'emperor_g56', hex: '#51927D', status: 'active', availableUntil: '', partId: ''},
        109: {material: 'julep_g57', hex: '#72B594', status: 'active', availableUntil: '', partId: ''},
        110: {material: 'eden_g58', hex: '#CADEB4', status: 'active', availableUntil: '', partId: ''},
        111: {material: 'jardin_g59', hex: '#DBE9DE', status: 'active', availableUntil: '', partId: ''},
        112: {material: 'aloe_g60', hex: '#E9ECDD', status: 'active', availableUntil: '', partId: ''},
        113: {material: 'sapling_g61', hex: '#DAE1C6', status: 'active', availableUntil: '', partId: ''},
        114: {material: 'wintergreen_g62', hex: '#DCE4C6', status: 'active', availableUntil: '', partId: ''},
        115: {material: 'copen_g63', hex: '#E5EACA', status: 'active', availableUntil: '', partId: ''},
        116: {material: 'jewel_b11', hex: '#3D6F6C', status: 'active', availableUntil: '', partId: ''},
        117: {material: 'saltwater_b12', hex: '#35747F', status: 'active', availableUntil: '', partId: ''},
        118: {material: 'venice_b13', hex: '#4DABB2', status: 'active', availableUntil: '', partId: ''},
        119: {material: 'sea_b14', hex: '#9AC9C1', status: 'active', availableUntil: '', partId: ''},
        120: {material: 'cayman_b15', hex: '#B0D5D5', status: 'active', availableUntil: '', partId: ''},
        121: {material: 'swan-dive_b16', hex: '#BCDAD6', status: 'active', availableUntil: '', partId: ''},
        122: {material: 'heron_b17', hex: '#D2E5E6', status: 'active', availableUntil: '', partId: ''},
        123: {material: 'reef_b18', hex: '#DDE9E6', status: 'active', availableUntil: '', partId: ''},
        124: {material: 'seahorse_b19', hex: '#E9F2EC', status: 'active', availableUntil: '', partId: ''},
        125: {material: 'buoyant_b20', hex: '#DBEAE0', status: 'active', availableUntil: '', partId: ''},
        126: {material: 'cruise_b21', hex: '#94C9DA', status: 'active', availableUntil: '', partId: ''},
        127: {material: 'poseidon_b22', hex: '#5EABC2', status: 'active', availableUntil: '', partId: ''},
        128: {material: 'calypso_b23', hex: '#2288B1', status: 'active', availableUntil: '', partId: ''},
        129: {material: 'matisse_b24', hex: '#469ACF', status: 'active', availableUntil: '', partId: ''},
        130: {material: 'cobalt_b25', hex: '#4C8FCC', status: 'active', availableUntil: '', partId: ''},
        131: {material: 'cassidy_b26', hex: '#396BAF', status: 'active', availableUntil: '', partId: ''},
        132: {material: 'catalina_b27', hex: '#2C5BA2', status: 'active', availableUntil: '', partId: ''},
        133: {material: 'dory_b28', hex: '#1C6EAE', status: 'active', availableUntil: '', partId: ''},
        134: {material: 'lapis_b29', hex: '#1D5B99', status: 'active', availableUntil: '', partId: ''},
        135: {material: 'wizard_b30', hex: '#2F4A70', status: 'active', availableUntil: '', partId: ''},
        136: {material: 'denim_b31', hex: '#628CAF', status: 'active', availableUntil: '', partId: ''},
        137: {material: 'harbor_b32', hex: '#5A94AF', status: 'active', availableUntil: '', partId: ''},
        138: {material: 'mariner_b33', hex: '#7C9FA6', status: 'active', availableUntil: '', partId: ''},
        139: {material: 'loch_b34', hex: '#8DA6AA', status: 'active', availableUntil: '', partId: ''},
        140: {material: 'atlantic_b35', hex: '#89AAB9', status: 'active', availableUntil: '', partId: ''},
        141: {material: 'raindrop_b36', hex: '#97C3DB', status: 'active', availableUntil: '', partId: ''},
        142: {material: 'shoreline_b37', hex: '#7EC0DC', status: 'active', availableUntil: '', partId: ''},
        143: {material: 'surf_b38', hex: '#BBDCE9', status: 'active', availableUntil: '', partId: ''},
        144: {material: 'robin_b39', hex: '#D3E7EF', status: 'active', availableUntil: '', partId: ''},
        145: {material: 'tide_b40', hex: '#E3EDF3', status: 'active', availableUntil: '', partId: ''},
        146: {material: 'aviator_b41', hex: '#DAE3E7', status: 'active', availableUntil: '', partId: ''},
        147: {material: 'cloudless_b42', hex: '#DEEAF4', status: 'active', availableUntil: '', partId: ''},
        148: {material: 'fountain_b43', hex: '#B3D6ED', status: 'active', availableUntil: '', partId: ''},
        149: {material: 'flood_b44', hex: '#A1CDEA', status: 'active', availableUntil: '', partId: ''},
        150: {material: 'pier_b45', hex: '#77B0E1', status: 'active', availableUntil: '', partId: ''},
        151: {material: 'cornflower_b46', hex: '#92C4ED', status: 'active', availableUntil: '', partId: ''},
        152: {material: 'lago_b47', hex: '#ACCFEE', status: 'active', availableUntil: '', partId: ''},
        153: {material: 'skydive_b48', hex: '#C0DBF2', status: 'active', availableUntil: '', partId: ''},
        154: {material: 'bliss_b49', hex: '#C0D6EF', status: 'active', availableUntil: '', partId: ''},
        155: {material: 'daydream_b50', hex: '#B0C6DF', status: 'active', availableUntil: '', partId: ''},
        156: {material: 'bay_b51', hex: '#87A3C4', status: 'active', availableUntil: '', partId: ''},
        157: {material: 'midnight_b52', hex: '#80A4D6', status: 'active', availableUntil: '', partId: ''},
        158: {material: 'tahoe_b53', hex: '#436FB2', status: 'active', availableUntil: '', partId: ''},
        159: {material: 'nautical_b54', hex: '#4D73A5', status: 'active', availableUntil: '', partId: ''},
        160: {material: 'cadet_b55', hex: '#627EA4', status: 'active', availableUntil: '', partId: ''},
        161: {material: 'moonstone_b56', hex: '#738FB7', status: 'active', availableUntil: '', partId: ''},
        162: {material: 'sparta_b57', hex: '#849ACD', status: 'active', availableUntil: '', partId: ''},
        163: {material: 'atlas_b58', hex: '#5D78B7', status: 'active', availableUntil: '', partId: ''},
        164: {material: 'hyacinth_b59', hex: '#5B72B2', status: 'active', availableUntil: '', partId: ''},
        165: {material: 'mythical_b60', hex: '#2B3C78', status: 'active', availableUntil: '', partId: ''},
        166: {material: 'bluejay_b61', hex: '#57678A', status: 'active', availableUntil: '', partId: ''},
        167: {material: 'monsoon_b62', hex: '#5B6E80', status: 'active', availableUntil: '', partId: ''},
        168: {material: 'overcast_b63', hex: '#425559', status: 'active', availableUntil: '', partId: ''},
        169: {material: 'majesty_v03', hex: '#383048', status: 'active', availableUntil: '', partId: ''},
        170: {material: 'amethyst_v04', hex: '#5C599D', status: 'active', availableUntil: '', partId: ''},
        171: {material: 'dahlia_v05', hex: '#8289BF', status: 'active', availableUntil: '', partId: ''},
        172: {material: 'lavender_v06', hex: '#8B8EAB', status: 'active', availableUntil: '', partId: ''},
        173: {material: 'violet_v07', hex: '#B2B8DA', status: 'active', availableUntil: '', partId: ''},
        174: {material: 'dawn_v08', hex: '#BDBFDF', status: 'active', availableUntil: '', partId: ''},
        175: {material: 'lilac_v09', hex: '#B9B1C8', status: 'active', availableUntil: '', partId: ''},
        176: {material: 'boulevard_v10', hex: '#AF9BBA', status: 'active', availableUntil: '', partId: ''},
        177: {material: 'iris_v11', hex: '#775B88', status: 'active', availableUntil: '', partId: ''},
        178: {material: 'prince_v12', hex: '#732674', status: 'active', availableUntil: '', partId: ''},
        179: {material: 'bewitched_v13', hex: '#A57D99', status: 'active', availableUntil: '', partId: ''},
        180: {material: 'aphrodite_v14', hex: '#B57AA9', status: 'active', availableUntil: '', partId: ''},
        181: {material: 'lollipop_v15', hex: '#D9B3D1', status: 'active', availableUntil: '', partId: ''},
        182: {material: 'lily_v16', hex: '#E9D9E3', status: 'active', availableUntil: '', partId: ''},
        183: {material: 'cosmo_v17', hex: '#F0DAE8', status: 'active', availableUntil: '', partId: ''},
        184: {material: 'cupid_v18', hex: '#E8BCD4', status: 'active', availableUntil: '', partId: ''},
        185: {material: 'flamingo_v19', hex: '#DC90B7', status: 'active', availableUntil: '', partId: ''},
        186: {material: 'sassy_v20', hex: '#DA85A3', status: 'active', availableUntil: '', partId: ''},
        187: {material: 'dollhouse_v21', hex: '#D36D94', status: 'active', availableUntil: '', partId: ''},
        188: {material: 'tamale_v22', hex: '#C63139', status: 'active', availableUntil: '', partId: ''},
        189: {material: 'jam_v23', hex: '#C12C42', status: 'active', availableUntil: '', partId: ''},
        190: {material: 'hibiscus_v24', hex: '#B73248', status: 'active', availableUntil: '', partId: ''},
        191: {material: 'taffy_v25', hex: '#9D3151', status: 'active', availableUntil: '', partId: ''},
        192: {material: 'fig_v26', hex: '#4C1C3C', status: 'active', availableUntil: '', partId: ''},
        193: {material: 'bohemian_v27', hex: '#7A5A62', status: 'active', availableUntil: '', partId: ''},
        194: {material: 'gypsum_n06', hex: '#E9E5CF', status: 'active', availableUntil: '', partId: ''},
        195: {material: 'biscotti_n07', hex: '#EBE4D6', status: 'active', availableUntil: '', partId: ''},
        196: {material: 'sable_n08', hex: '#E0D4C5', status: 'active', availableUntil: '', partId: ''},
        197: {material: 'toasted_n09', hex: '#EBE0C1', status: 'active', availableUntil: '', partId: ''},
        198: {material: 'melon_n10', hex: '#F0E0BB', status: 'active', availableUntil: '', partId: ''},
        199: {material: 'allyssa_n11', hex: '#ECDBBD', status: 'active', availableUntil: '', partId: ''},
        200: {material: 'nectar_n12', hex: '#EFE5CF', status: 'active', availableUntil: '', partId: ''},
        201: {material: 'glow_n13', hex: '#F9F4D8', status: 'active', availableUntil: '', partId: ''},
        202: {material: 'lemon_n14', hex: '#F7F1C8', status: 'active', availableUntil: '', partId: ''},
        203: {material: 'sunrise_n15', hex: '#F3E7C6', status: 'active', availableUntil: '', partId: ''},
        204: {material: 'mellow_n16', hex: '#F4E7B5', status: 'active', availableUntil: '', partId: ''},
        205: {material: 'lioness_n17', hex: '#EFE3BF', status: 'active', availableUntil: '', partId: ''},
        206: {material: 'fawn_n18', hex: '#DFD0AD', status: 'active', availableUntil: '', partId: ''},
        207: {material: 'jicama_n19', hex: '#BEAA78', status: 'active', availableUntil: '', partId: ''},
        208: {material: 'almond_n20', hex: '#9A8A64', status: 'active', availableUntil: '', partId: ''},
        209: {material: 'saddle_n21', hex: '#9D7B55', status: 'active', availableUntil: '', partId: ''},
        210: {material: 'khaki_n22', hex: '#D3CAAB', status: 'active', availableUntil: '', partId: ''},
        211: {material: 'oat_n23', hex: '#F0EEE4', status: 'active', availableUntil: '', partId: ''},
        212: {material: 'dew_n24', hex: '#E5E4D1', status: 'active', availableUntil: '', partId: ''},
        213: {material: 'farmer_n25', hex: '#B5AA8C', status: 'active', availableUntil: '', partId: ''},
        214: {material: 'bittersweet_n26', hex: '#382B1E', status: 'active', availableUntil: '', partId: ''},
        215: {material: 'sepia_n27', hex: '#A4937A', status: 'active', availableUntil: '', partId: ''},
        216: {material: 'bark_n28', hex: '#8F6D4B', status: 'active', availableUntil: '', partId: ''},
        217: {material: 'whiskey_n29', hex: '#985A28', status: 'active', availableUntil: '', partId: ''},
        218: {material: 'leather_n30', hex: '#532D1D', status: 'active', availableUntil: '', partId: ''},
        219: {material: 'redwood_n31', hex: '#AE7757', status: 'active', availableUntil: '', partId: ''},
        220: {material: 'blush_n32', hex: '#CAAA93', status: 'active', availableUntil: '', partId: ''},
        221: {material: 'eggplant_n33', hex: '#A77F6E', status: 'active', availableUntil: '', partId: ''},
        222: {material: 'teaberry_n34', hex: '#E9DEDB', status: 'active', availableUntil: '', partId: ''},
        223: {material: 'concord_n35', hex: '#AD9C9D', status: 'active', availableUntil: '', partId: ''},
        224: {material: 'compass_n36', hex: '#ABA7A5', status: 'active', availableUntil: '', partId: ''},
        225: {material: 'smudge_n37', hex: '#C2C3C0', status: 'active', availableUntil: '', partId: ''},
        226: {material: 'zeppelin_n38', hex: '#8D8F91', status: 'active', availableUntil: '', partId: ''},
        227: {material: 'alley_n39', hex: '#4C4C53', status: 'active', availableUntil: '', partId: ''},
        228: {material: 'gotham_n40', hex: '#282C2E', status: 'active', availableUntil: '', partId: ''},
        229: {material: 'cauldron_n41', hex: '#485051', status: 'active', availableUntil: '', partId: ''},
        230: {material: 'drizzle_n42', hex: '#B4BDBA', status: 'active', availableUntil: '', partId: ''},
        231: {material: 'porpoise_n43', hex: '#C7C9C8', status: 'active', availableUntil: '', partId: ''},
        232: {material: 'wolf_n44', hex: '#BDC1C3', status: 'active', availableUntil: '', partId: ''},
        233: {material: 'cityscape_n45', hex: '#E3E6EA', status: 'active', availableUntil: '', partId: ''},
        234: {material: 'pond_n46', hex: '#EFF5F9', status: 'active', availableUntil: '', partId: ''},
        235: {material: 'nebulous_n47', hex: '#F7F8F8', status: 'active', availableUntil: '', partId: ''},
        236: {material: 'helium_n48', hex: '#F3F4F3', status: 'active', availableUntil: '', partId: ''},
        237: {material: 'ash_n49', hex: '#E6E7E7', status: 'active', availableUntil: '', partId: ''},
        238: {material: 'elephant_n50', hex: '#D9DADB', status: 'active', availableUntil: '', partId: ''},
        239: {material: 'thunder_n51', hex: '#D4D4D4', status: 'active', availableUntil: '', partId: ''},
        240: {material: 'pewter_n52', hex: '#D7D6CF', status: 'active', availableUntil: '', partId: ''},
        241: {material: 'rockport_n53', hex: '#E7E5DE', status: 'active', availableUntil: '', partId: ''},
        242: {material: 'roadside_n54', hex: '#D0CABB', status: 'active', availableUntil: '', partId: ''},
        243: {material: 'wren_n55', hex: '#CEC7B6', status: 'active', availableUntil: '', partId: ''},
        244: {material: 'warmstone_n56', hex: '#B6B0A3', status: 'active', availableUntil: '', partId: ''},
        245: {material: 'galvanize_n57', hex: '#988F89', status: 'active', availableUntil: '', partId: ''},
        246: {material: 'noir_n58', hex: '#6A675E', status: 'active', availableUntil: '', partId: ''},
        247: {material: 'meteorite_n59', hex: '#4C4841', status: 'active', availableUntil: '', partId: ''},
        248: {material: 'nightshade_n60', hex: '#423A32', status: 'active', availableUntil: '', partId: ''},
        249: {material: 'dust_n61', hex: '#EBE8E4', status: 'active', availableUntil: '', partId: ''},
      }
    }
  }

  constructor() { }

}
