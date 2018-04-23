import { Injectable } from '@angular/core';

@Injectable()
export class MaterialsService {
  public parts_substitutes: PartsSubs[];

  public clario_grids = {
    '15_16': {
      '24x24': {
        'name': '24\"x24\"',
        'units': 'inches',
        'cut_file': 'Clario 24x24 15_16 Rev2.dxf'
      },
      '24x48': {
        'name': '24\"x48\"',
        'units': 'inches',
        'cut_file': 'Clario 24x48 15_16 Rev2.dxf'
      },
      '600x600': {
        'name': '600x600mm',
        'units': 'centimeters',
        'cut_file': 'Clario 600x600 Rev2.dxf'
      },
      '600x1200': {
        'name': '600x1200mm',
        'units': 'centimeters',
        'cut_file': 'Clario 600x1200 Rev2.dxf'
      },
      '625x625': {
        'name': '625x625mm',
        'units': 'centimeters',
        'cut_file': 'Clario 625x625 Rev2.dxf'
      },
      '625x1250': {
        'name': '625x1250mm',
        'units': 'centimeters',
        'cut_file': 'Clario 625x1250 Rev2.dxf'
      },
    },
    '9_16': {
      '24x24': {
        'name': '24\"x24\"',
        'units': 'inches',
        'cut_file': 'Clario 24x24 9_16 Rev2.dxf'
      },
      '24x48': {
        'name': '24\"x48',
        'units': 'inches',
        'cut_file': 'Clario 24x48 9_16 Rev2.dxf'
      },
    }
  };

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
        '3-85-101': {},
        '3-15-0842': {},
        '3-85-105': {},
        '3-85-106': {},
        '3-85-102': {} // zipties
      }
    },
   '1': {
      'name': 'curved-partition',
      'title': 'Freestanding Curved Partition',
      'image': '/assets/images/renderings/freestanding_curved_partition.png',
      'width': 96,
      'height': 72,
      'radius': 60,
      'angle': '',
      'ceiling_length': '',
      'hardware': {
        '3-85-101': {},
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
        '3-85-101': {},
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
        '3-85-101': {},
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
        '3-85-101': {},
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
        'ruby': {
          material: 'ruby',
          image: '/assets/images/materials/felt/sola/ruby.png',
          status: 'active',
          available_until: '',
          name_str: 'Ruby',
          sheet_part_id: '0-51-916'
        },
        'aries': {
          material: 'aries',
          image: '/assets/images/materials/felt/sola/aries.png',
          status: 'active',
          available_until: '',
          name_str: 'Aries',
          sheet_part_id: '0-51-917'
        },
        'citrine': {
          material: 'citrine',
          image: '/assets/images/materials/felt/sola/citrine.png',
          status: 'active',
          available_until: '',
          name_str: 'Citrine',
          sheet_part_id: '0-51-918'
        },
        'admiral': {
          material: 'admiral',
          image: '/assets/images/materials/felt/sola/admiral.png',
          status: 'active',
          available_until: '',
          name_str: 'Admiral',
          sheet_part_id: '0-51-920'
        },
        'oxford': {
          material: 'oxford',
          image: '/assets/images/materials/felt/sola/oxford.png',
          status: 'active',
          available_until: '',
          name_str: 'Oxford',
          sheet_part_id: '0-51-919'
        },
        'hunter': {
          material: 'hunter',
          image: '/assets/images/materials/felt/sola/hunter.png',
          status: 'active',
          available_until: '',
          name_str: 'Hunter',
          sheet_part_id: '0-51-921'
        },
        'burnt_umber': {
          material: 'burnt_umber',
          image: '/assets/images/materials/felt/sola/burnt_umber.png',
          status: 'active',
          available_until: '',
          name_str: 'Burnt Umber',
          sheet_part_id: '0-51-930'
        },
        'nickel': {
          material: 'nickel',
          image: '/assets/images/materials/felt/sola/nickel.png',
          status: 'active',
          available_until: '',
          name_str: 'Nickel',
          sheet_part_id: '0-51-926'
        },
        'armor': {
          material: 'armor',
          image: '/assets/images/materials/felt/sola/armor.png',
          status: 'active',
          available_until: '',
          name_str: 'Armor',
          sheet_part_id: '0-51-924'
        },
        'mineral': {
          material: 'mineral',
          image: '/assets/images/materials/felt/sola/mineral.png',
          status: 'active',
          available_until: '',
          name_str: 'Mineral',
          sheet_part_id: '0-51-923'
        },
        'cast': {
          material: 'cast',
          image: '/assets/images/materials/felt/sola/cast.png',
          status: 'active',
          available_until: '',
          name_str: 'Cast',
          sheet_part_id: '0-51-929'
        },
        'ebony': {
          material: 'ebony',
          image: '/assets/images/materials/felt/sola/ebony.png',
          status: 'active',
          available_until: '',
          name_str: 'Ebony',
          sheet_part_id: '0-51-927'
        },
        'cashmere': {
          material: 'cashmere',
          image: '/assets/images/materials/felt/sola/cashmere.png',
          status: 'active',
          available_until: '',
          name_str: 'Cashmere',
          sheet_part_id: '0-51-928'
        },
        'moon': {
          material: 'moon',
          image: '/assets/images/materials/felt/sola/moon.png',
          status: 'active',
          available_until: '',
          name_str: 'Moon',
          sheet_part_id: '0-51-922'
        },
        'zinc': {
          material: 'zinc',
          image: '/assets/images/materials/felt/sola/zinc.png',
          status: 'active',
          available_until: '',
          name_str: 'Zinc',
          sheet_part_id: '0-51-925'
        },
        'ore': {
          material: 'ore',
          image: '/assets/images/materials/felt/sola/ore.png',
          status: 'inactive',
          available_until: 'March 2019',
          name_str: 'Ore',
          sheet_part_id: '0-51-802'
        },
        'dark_gray': {
          material: 'dark_gray',
          image: '/assets/images/materials/felt/sola/dark_gray.png',
          status: 'inactive',
          available_until: 'March 2019',
          name_str: 'Dark Gray',
          sheet_part_id: '0-51-801'
        },
      },
      merino: {
        0: {
          material: 'milky-white',
          image: '/assets/images/materials/felt/merino/milky-white.png',
          hex: '#dfdee0',
          status: 'active',
          name_str: 'Milky White',
          availableUntil: '',
          partId: ''
        },
        1: {
          material: 'heather-gray',
          image: '/assets/images/materials/felt/merino/heather-gray.png',
          hex: '#babbbe',
          status: 'active',
          name_str: 'Heather Gray',
          availableUntil: '',
          partId: ''
        },
        2: {
          material: 'charcoal',
          image: '/assets/images/materials/felt/merino/charcoal.png',
          hex: '#445062',
          status: 'active',
          name_str: 'Charcoal',
          availableUntil: '',
          partId: ''
        },
        3: {
          material: 'heather-charcoal',
          image: '/assets/images/materials/felt/merino/heather-charcoal.png',
          hex: '#5e616d',
          status: 'active',
          name_str: 'Heather Charcoal',
          availableUntil: '',
          partId: ''
        },
        4: {
          material: 'heather-black',
          image: '/assets/images/materials/felt/merino/heather-black.png',
          hex: '#353542',
          status: 'active',
          name_str: 'Heather Black',
          availableUntil: '',
          partId: ''
        },
        5: {
          material: 'black',
          image: '/assets/images/materials/felt/merino/black.png',
          hex: '#20232d',
          status: 'active',
          name_str: 'Black',
          availableUntil: '',
          partId: ''
        },
        6: {
          material: 'taupe',
          image: '/assets/images/materials/felt/merino/taupe.png',
          hex: '#b7a7a3',
          status: 'active',
          name_str: 'Taupe',
          availableUntil: '',
          partId: ''
        },
        7: {
          material: 'heather-taupe',
          image: '/assets/images/materials/felt/merino/heather-taupe.png',
          hex: '#b3aaa4',
          status: 'active',
          name_str: 'Heather Taupe',
          availableUntil: '',
          partId: ''
        },
        8: {
          material: 'putty',
          image: '/assets/images/materials/felt/merino/putty.png',
          hex: '#8e7476',
          status: 'active',
          name_str: 'Putty',
          availableUntil: '',
          partId: ''
        },
        9: {
          material: 'latte',
          image: '/assets/images/materials/felt/merino/latte.png',
          hex: '#a15532',
          status: 'active',
          name_str: 'Latte',
          availableUntil: '',
          partId: ''
        },
        10: {
          material: 'heather-dark-brown',
          image: '/assets/images/materials/felt/merino/heather-dark-brown.png',
          hex: '#54393a',
          status: 'active',
          name_str: 'Heather Dark Brown',
          availableUntil: '',
          partId: ''
        },
        11: {
          material: 'dark-brown',
          image: '/assets/images/materials/felt/merino/dark-brown.png',
          hex: '#382228',
          status: 'active',
          name_str: 'Dark Brown',
          availableUntil: '',
          partId: ''
        },
        12: {
          material: 'red',
          image: '/assets/images/materials/felt/merino/red.png',
          hex: '#e20000',
          status: 'active',
          name_str: 'Red',
          availableUntil: '',
          partId: ''
        },
        13: {
          material: 'crimson',
          image: '/assets/images/materials/felt/merino/crimson.png',
          hex: '#bf001f',
          status: 'active',
          name_str: 'Crimson',
          availableUntil: '',
          partId: ''
        },
        14: {
          material: 'bordeaux',
          image: '/assets/images/materials/felt/merino/bordeaux.png',
          hex: '#700229',
          status: 'active',
          name_str: 'Bordeaux',
          availableUntil: '',
          partId: ''
        },
        15: {
          material: 'raspberry-jam',
          image: '/assets/images/materials/felt/merino/raspberry-jam.png',
          hex: '#bb0058',
          status: 'active',
          name_str: 'Raspberry Jam',
          availableUntil: '',
          partId: ''
        },
        16: {
          material: 'royal-purple',
          image: '/assets/images/materials/felt/merino/royal-purple.png',
          hex: '#481a6d',
          status: 'active',
          name_str: 'Royal Purple',
          availableUntil: '',
          partId: ''
        },
        17: {
          material: 'midnight-blue',
          image: '/assets/images/materials/felt/merino/midnight-blue.png',
          hex: '#22234e',
          status: 'active',
          name_str: 'Midnight Blue',
          availableUntil: '',
          partId: ''
        },
        18: {
          material: 'peacock',
          image: '/assets/images/materials/felt/merino/peacock.png',
          hex: '#003363',
          status: 'active',
          name_str: 'Peacock',
          availableUntil: '',
          partId: ''
        },
        19: {
          material: 'liberty-blue',
          image: '/assets/images/materials/felt/merino/liberty-blue.png',
          hex: '#005db0',
          status: 'active',
          name_str: 'Liberty',
          availableUntil: '',
          partId: ''
        },
        20: {
          material: 'deep-turquoise',
          image: '/assets/images/materials/felt/merino/deep-turquoise.png',
          hex: '#006ecb',
          status: 'active',
          name_str: 'Deep',
          availableUntil: '',
          partId: ''
        },
        21: {
          material: 'platinum',
          image: '/assets/images/materials/felt/merino/platinum.png',
          hex: '#8a95a6',
          status: 'active',
          name_str: 'Platinum',
          availableUntil: '',
          partId: ''
        },
        22: {
          material: 'sky-blue',
          image: '/assets/images/materials/felt/merino/sky-blue.png',
          hex: '#01a5d4',
          status: 'active',
          name_str: 'Sky',
          availableUntil: '',
          partId: ''
        },
        23: {
          material: 'teal',
          image: '/assets/images/materials/felt/merino/teal.png',
          hex: '#00a494',
          status: 'active',
          name_str: 'Teal',
          availableUntil: '',
          partId: ''
        },
        24: {
          material: 'hunter-green',
          image: '/assets/images/materials/felt/merino/hunter-green.png',
          hex: '#003b39',
          status: 'active',
          name_str: 'Hunter',
          availableUntil: '',
          partId: ''
        },
        25: {
          material: 'avocado',
          image: '/assets/images/materials/felt/merino/avocado.png',
          hex: '#778a00',
          status: 'active',
          name_str: 'Avocado',
          availableUntil: '',
          partId: ''
        },
        26: {
          material: 'clover-green',
          image: '/assets/images/materials/felt/merino/clover-green.png',
          hex: '#019a00',
          status: 'active',
          name_str: 'Clover',
          availableUntil: '',
          partId: ''
        },
        27: {
          material: 'goldenrod',
          image: '/assets/images/materials/felt/merino/goldenrod.png',
          hex: '#ffb300',
          status: 'active',
          name_str: 'Goldenrod',
          availableUntil: '',
          partId: ''
        },
        28: {
          material: 'camel',
          image: '/assets/images/materials/felt/merino/camel.png',
          hex: '#dfa77b',
          status: 'active',
          name_str: 'Camel',
          availableUntil: '',
          partId: ''
        },
        29: {
          material: 'orange',
          image: '/assets/images/materials/felt/merino/orange.png',
          hex: '#ff6c00',
          status: 'active',
          name_str: 'Orange',
          availableUntil: '',
          partId: ''
        }
      },
    },
    varia: {
      color: {
        0: { material: 'bashful_r10', hex: '#E2A494', status: 'discontinued', availableUntil: '', partId: 9841 },
        1: { material: 'coral_r11', hex: '#EDCAB3', status: 'active', availableUntil: '', partId: 1537 },
        2: { material: 'cosmetic_r12', hex: '#EED0B9', status: 'active', availableUntil: '', partId: 9876 },
        3: { material: 'nude_r13', hex: '#F4E2C9', status: 'active', availableUntil: '', partId: 9962 },
        4: { material: 'ginger_r14', hex: '#EDC19F', status: 'active', availableUntil: '', partId: 9909 },
        5: { material: 'salmon_r15', hex: '#E4A786', status: 'active', availableUntil: '', partId: 9988 },
        6: { material: 'sherbet_r16', hex: '#D2663F', status: 'active', availableUntil: '', partId: 9995 },
        7: { material: 'cranberry_r17', hex: '#C72F1D', status: 'active', availableUntil: '', partId: 1012 },
        8: { material: 'love_r18', hex: '#C5221C', status: 'active', availableUntil: '', partId: 9945 },
        9: { material: 'jello_r19', hex: '#BB241C', status: 'active', availableUntil: '', partId: 9928 },
        10: { material: 'gypsy_r20', hex: '#B03F1F', status: 'active', availableUntil: '', partId: 9917 },
        11: { material: 'strawberry_r21', hex: '#8D241E', status: 'active', availableUntil: '', partId: 10004 },
        12: { material: 'garnet_r22', hex: '#852426', status: 'active', availableUntil: '', partId: 9908 },
        13: { material: 'desire_r23', hex: '#922822', status: 'active', availableUntil: '', partId: 9889 },
        14: { material: 'radish_r24', hex: '#A72020', status: 'active', availableUntil: '', partId: 9977 },
        15: { material: 'sweetheart_r25', hex: '#A32023', status: 'active', availableUntil: '', partId: 10010 },
        16: { material: 'daredevil_r26', hex: '#B12020', status: 'active', availableUntil: '', partId: 9885 },
        17: { material: 'spunky_r27', hex: '#C32920', status: 'active', availableUntil: '', partId: 10002 },
        18: { material: 'rouge_r28', hex: '#BD2225', status: 'active', availableUntil: '', partId: 9986 },
        19: { material: 'gladiola_r29', hex: '#CB7177', status: 'active', availableUntil: '', partId: 9911 },
        20: { material: 'peony_r30', hex: '#E4C1BB', status: 'active', availableUntil: '', partId: 9967 },
        21: { material: 'petal_r31', hex: '#EAD2D3', status: 'active', availableUntil: '', partId: 1536 },
        22: { material: 'powder_puff_r32', hex: '#F0E5E2', status: 'active', availableUntil: '', partId: 10037 },
        23: { material: 'azalea_r33', hex: '#EAD4C8', status: 'active', availableUntil: '', partId: 9840 },
        24: { material: 'begonia_r34', hex: '#E8B6B0', status: 'active', availableUntil: '', partId: 9845 },
        25: { material: 'watermelon_r35', hex: '#DC8B8F', status: 'active', availableUntil: '', partId: 10027 },
        26: { material: 'dragon_fruit_r36', hex: '#D46C74', status: 'active', availableUntil: '', partId: 9893 },
        27: { material: 'pomegranate_r37', hex: '#A1382E', status: 'active', availableUntil: '', partId: 445 },
        28: { material: 'beet_r38', hex: '#67242A', status: 'active', availableUntil: '', partId: 9844 },
        29: { material: 'merlot_r39', hex: '#451A2E', status: 'active', availableUntil: '', partId: 9952 },
        30: { material: 'clementine_o07', hex: '#E09A20', status: 'active', availableUntil: '', partId: 9871 },
        31: { material: 'carnival_o08', hex: '#D98022', status: 'active', availableUntil: '', partId: 9858 },
        32: { material: 'oj_o09', hex: '#DC8B21', status: 'active', availableUntil: '', partId: 456 },
        33: { material: 'festive_o10', hex: '#CF5F20', status: 'active', availableUntil: '', partId: 9901 },
        34: { material: 'chipotle_o11', hex: '#BF5721', status: 'active', availableUntil: '', partId: 9865 },
        35: { material: 'persimmon_o12', hex: '#CE5820', status: 'active', availableUntil: '', partId: 446 },
        36: { material: 'jubilee_o13', hex: '#D7792B', status: 'active', availableUntil: '', partId: 9931 },
        37: { material: 'charmer_o14', hex: '#DF963B', status: 'active', availableUntil: '', partId: 9864 },
        38: { material: 'butternut_o15', hex: '#DF9620', status: 'active', availableUntil: '', partId: 9853 },
        39: { material: 'giraffe_o16', hex: '#C9992B', status: 'active', availableUntil: '', partId: 9910 },
        40: { material: 'curry_o17', hex: '#CE8827', status: 'active', availableUntil: '', partId: 447 },
        41: { material: 'marmalade_o18', hex: '#D5994A', status: 'active', availableUntil: '', partId: 1665 },
        42: { material: 'shrimp_o19', hex: '#EDC28D', status: 'active', availableUntil: '', partId: 9997 },
        43: { material: 'mai_tai_o20', hex: '#DB8549', status: 'active', availableUntil: '', partId: 659 },
        44: { material: 'punch_o21', hex: '#D67242', status: 'active', availableUntil: '', partId: 9976 },
        45: { material: 'paprika_o22', hex: '#B3381D', status: 'active', availableUntil: '', partId: 9965 },
        46: { material: 'butterscotch_y06', hex: '#CFAE61', status: 'active', availableUntil: '', partId: 9854 },
        47: { material: 'couscous_y07', hex: '#EBCD76', status: 'active', availableUntil: '', partId: 9878 },
        48: { material: 'gardenia_y08', hex: '#EEDB9F', status: 'active', availableUntil: '', partId: 9907 },
        49: { material: 'morning_y09', hex: '#F9EFC0', status: 'active', availableUntil: '', partId: 9956 },
        50: { material: 'daffodil_y10', hex: '#F3E6A4', status: 'active', availableUntil: '', partId: 9882 },
        51: { material: 'vitamin_c_y11', hex: '#F4E088', status: 'active', availableUntil: '', partId: 1142 },
        52: { material: 'taxicab_y12', hex: '#F0D059', status: 'active', availableUntil: '', partId: 10015 },
        53: { material: 'golden_y13', hex: '#DEC046', status: 'active', availableUntil: '', partId: 9913 },
        54: { material: 'squash_y14', hex: '#EDC742', status: 'active', availableUntil: '', partId: 10003 },
        55: { material: 'tiger_y15', hex: '#EAB51D', status: 'active', availableUntil: '', partId: 10019 },
        56: { material: 'pharaoh_y16', hex: '#EEC421', status: 'active', availableUntil: '', partId: 9969 },
        57: { material: 'sunnyside_y17', hex: '#F1CA45', status: 'active', availableUntil: '', partId: 10005 },
        58: { material: 'butter_y18', hex: '#F4E77E', status: 'active', availableUntil: '', partId: 9852 },
        59: { material: 'daisy_y19', hex: '#F1DD3A', status: 'active', availableUntil: '', partId: 9884 },
        60: { material: 'chirp_y20', hex: '#F4E445', status: 'active', availableUntil: '', partId: 9866 },
        61: { material: 'marigold_y21', hex: '#F4EC90', status: 'active', availableUntil: '', partId: 661 },
        62: { material: 'springtime_y22', hex: '#F6F3B7', status: 'active', availableUntil: '', partId: 10001 },
        63: { material: 'camel_y23', hex: '#EBE2A0', status: 'active', availableUntil: '', partId: 656 },
        64: { material: 'wafer_y24', hex: '#DDCD8C', status: 'active', availableUntil: '', partId: 10025 },
        65: { material: 'cider_y25', hex: '#CEBC6F', status: 'active', availableUntil: '', partId: 9867 },
        66: { material: 'syrup_y26', hex: '#907135', status: 'active', availableUntil: '', partId: 10011 },
        67: { material: 'glazed_g15', hex: '#EBEAD4', status: 'active', availableUntil: '', partId: 9912 },
        68: { material: 'pickle_g16', hex: '#EBE9C8', status: 'active', availableUntil: '', partId: 9970 },
        69: { material: 'lark_g17', hex: '#E2E1C5', status: 'active', availableUntil: '', partId: 9936 },
        70: { material: 'pear_g18', hex: '#E6E8D3', status: 'active', availableUntil: '', partId: 9966 },
        71: { material: 'cucumber_g19', hex: '#E4E7CC', status: 'active', availableUntil: '', partId: 9880 },
        72: { material: 'nomad_g20', hex: '#CECDB6', status: 'active', availableUntil: '', partId: 9961 },
        73: { material: 'chai_g21', hex: '#736633', status: 'active', availableUntil: '', partId: 9863 },
        74: { material: 'terrace_g22', hex: '#A99B5C', status: 'active', availableUntil: '', partId: 10017 },
        75: { material: 'swamp_g23', hex: '#BFB98A', status: 'active', availableUntil: '', partId: 10007 },
        76: { material: 'hickory_g24', hex: '#C4B944', status: 'active', availableUntil: '', partId: 9922 },
        77: { material: 'vegan_g25', hex: '#C9C641', status: 'active', availableUntil: '', partId: 10023 },
        78: { material: 'citron_g26', hex: '#DFDB54', status: 'active', availableUntil: '', partId: 9869 },
        79: { material: 'acre_g27', hex: '#C2CC54', status: 'active', availableUntil: '', partId: 9830 },
        80: { material: 'turtle_g28', hex: '#BACE4D', status: 'active', availableUntil: '', partId: 10022 },
        81: { material: 'guacamole_g29', hex: '#DDE187', status: 'active', availableUntil: '', partId: 9915 },
        82: { material: 'minnow_g30', hex: '#D9E3C3', status: 'active', availableUntil: '', partId: 9954 },
        83: { material: 'garden_g31', hex: '#E8EAA1', status: 'active', availableUntil: '', partId: 9906 },
        84: { material: 'sweet_pea_g32', hex: '#E6E99D', status: 'active', availableUntil: '', partId: 10009 },
        85: { material: 'moss_g33', hex: '#CBD58A', status: 'active', availableUntil: '', partId: 1145 },
        86: { material: 'marsh_g34', hex: '#B9C583', status: 'active', availableUntil: '', partId: 439 },
        87: { material: 'rainforest_g35', hex: '#9AA26A', status: 'active', availableUntil: '', partId: 9979 },
        88: { material: 'basil_g36', hex: '#94A551', status: 'active', availableUntil: '', partId: 9842 },
        89: { material: 'apple_g37', hex: '#B3CA86', status: 'active', availableUntil: '', partId: 9836 },
        90: { material: 'rosemary_g38', hex: '#CDD498', status: 'active', availableUntil: '', partId: 9985 },
        91: { material: 'laurel_g39', hex: '#89AE6F', status: 'active', availableUntil: '', partId: 9937 },
        92: { material: 'cilantro_g40', hex: '#63924A', status: 'active', availableUntil: '', partId: 9868 },
        93: { material: 'tropical_g41', hex: '#6FAE45', status: 'active', availableUntil: '', partId: 10021 },
        94: { material: 'lawn_g42', hex: '#AECB76', status: 'active', availableUntil: '', partId: 460 },
        95: { material: 'thyme_g43', hex: '#C8DA90', status: 'active', availableUntil: '', partId: 10018 },
        96: { material: 'zucchini_g44', hex: '#CBDCA5', status: 'active', availableUntil: '', partId: 10034 },
        97: { material: 'rivulet_g45', hex: '#9BB89E', status: 'active', availableUntil: '', partId: 9981 },
        98: { material: 'oregano_g46', hex: '#89B18C', status: 'active', availableUntil: '', partId: 9963 },
        99: { material: 'shamrock_g47', hex: '#65AF81', status: 'active', availableUntil: '', partId: 9994 },
        100: { material: 'lucky_g48', hex: '#5B957D', status: 'active', availableUntil: '', partId: 9946 },
        101: { material: 'isle_g49', hex: '#6B887A', status: 'active', availableUntil: '', partId: 9925 },
        102: { material: 'seine_g50', hex: '#98C8BC', status: 'active', availableUntil: '', partId: 9992 },
        103: { material: 'awash_g51', hex: '#CDE0CE', status: 'active', availableUntil: '', partId: 9839 },
        104: { material: 'pixie_g52', hex: '#9AC9C1', status: 'active', availableUntil: '', partId: 9972 },
        105: { material: 'capri_g53', hex: '#67B3AB', status: 'active', availableUntil: '', partId: 9857 },
        106: { material: 'persian_g54', hex: '#53AB9C', status: 'active', availableUntil: '', partId: 9968 },
        107: { material: 'kilt_g55', hex: '#30A08D', status: 'active', availableUntil: '', partId: 9933 },
        108: { material: 'emperor_g56', hex: '#51927D', status: 'active', availableUntil: '', partId: 9898 },
        109: { material: 'julep_g57', hex: '#72B594', status: 'active', availableUntil: '', partId: 9932 },
        110: { material: 'eden_g58', hex: '#CADEB4', status: 'active', availableUntil: '', partId: 9896 },
        111: { material: 'jardin_g59', hex: '#DBE9DE', status: 'active', availableUntil: '', partId: 9927 },
        112: { material: 'aloe_g60', hex: '#E9ECDD', status: 'active', availableUntil: '', partId: 451 },
        113: { material: 'sapling_g61', hex: '#DAE1C6', status: 'active', availableUntil: '', partId: 9990 },
        114: { material: 'wintergreen_g62', hex: '#DCE4C6', status: 'active', availableUntil: '', partId: 10029 },
        115: { material: 'copen_g63', hex: '#E5EACA', status: 'active', availableUntil: '', partId: 9874 },
        116: { material: 'jewel_b11', hex: '#3D6F6C', status: 'active', availableUntil: '', partId: 9929 },
        117: { material: 'saltwater_b12', hex: '#35747F', status: 'active', availableUntil: '', partId: 9989 },
        118: { material: 'venice_b13', hex: '#4DABB2', status: 'active', availableUntil: '', partId: 10024 },
        119: { material: 'sea_b14', hex: '#9AC9C1', status: 'active', availableUntil: '', partId: 1143 },
        120: { material: 'cayman_b15', hex: '#B0D5D5', status: 'active', availableUntil: '', partId: 9862 },
        121: { material: 'swan_dive_b16', hex: '#BCDAD6', status: 'active', availableUntil: '', partId: 10008 },
        122: { material: 'heron_b17', hex: '#D2E5E6', status: 'active', availableUntil: '', partId: 9920 },
        123: { material: 'reef_b18', hex: '#DDE9E6', status: 'active', availableUntil: '', partId: 499 },
        124: { material: 'seahorse_b19', hex: '#E9F2EC', status: 'active', availableUntil: '', partId: 9991 },
        125: { material: 'buoyant_b20', hex: '#DBEAE0', status: 'active', availableUntil: '', partId: 9851 },
        126: { material: 'cruise_b21', hex: '#94C9DA', status: 'active', availableUntil: '', partId: 9879 },
        127: { material: 'poseidon_b22', hex: '#5EABC2', status: 'active', availableUntil: '', partId: 9974 },
        128: { material: 'calypso_b23', hex: '#2288B1', status: 'active', availableUntil: '', partId: 9856 },
        129: { material: 'matisse_b24', hex: '#469ACF', status: 'active', availableUntil: '', partId: 9949 },
        130: { material: 'cobalt_b25', hex: '#4C8FCC', status: 'active', availableUntil: '', partId: 1010 },
        131: { material: 'cassidy_b26', hex: '#396BAF', status: 'active', availableUntil: '', partId: 9859 },
        132: { material: 'catalina_b27', hex: '#2C5BA2', status: 'active', availableUntil: '', partId: 9860 },
        133: { material: 'dory_b28', hex: '#1C6EAE', status: 'active', availableUntil: '', partId: 9892 },
        134: { material: 'lapis_b29', hex: '#1D5B99', status: 'active', availableUntil: '', partId: 9935 },
        135: { material: 'wizard_b30', hex: '#2F4A70', status: 'active', availableUntil: '', partId: 10030 },
        136: { material: 'denim_b31', hex: '#628CAF', status: 'active', availableUntil: '', partId: 9888 },
        137: { material: 'harbor_b32', hex: '#5A94AF', status: 'active', availableUntil: '', partId: 9918 },
        138: { material: 'mariner_b33', hex: '#7C9FA6', status: 'active', availableUntil: '', partId: 9948 },
        139: { material: 'loch_b34', hex: '#8DA6AA', status: 'active', availableUntil: '', partId: 9943 },
        140: { material: 'atlantic_b35', hex: '#89AAB9', status: 'active', availableUntil: '', partId: 653 },
        141: { material: 'raindrop_b36', hex: '#97C3DB', status: 'active', availableUntil: '', partId: 9978 },
        142: { material: 'shoreline_b37', hex: '#7EC0DC', status: 'active', availableUntil: '', partId: 9996 },
        143: { material: 'surf_b38', hex: '#BBDCE9', status: 'active', availableUntil: '', partId: 449 },
        144: { material: 'robin_b39', hex: '#D3E7EF', status: 'active', availableUntil: '', partId: 9983 },
        145: { material: 'tide_b40', hex: '#E3EDF3', status: 'active', availableUntil: '', partId: 500 },
        146: { material: 'aviator_b41', hex: '#DAE3E7', status: 'active', availableUntil: '', partId: 9838 },
        147: { material: 'cloudless_b42', hex: '#DEEAF4', status: 'active', availableUntil: '', partId: 9872 },
        148: { material: 'fountain_b43', hex: '#B3D6ED', status: 'active', availableUntil: '', partId: 9904 },
        149: { material: 'flood_b44', hex: '#A1CDEA', status: 'active', availableUntil: '', partId: 1534 },
        150: { material: 'pier_b45', hex: '#77B0E1', status: 'active', availableUntil: '', partId: 9971 },
        151: { material: 'cornflower_b46', hex: '#92C4ED', status: 'active', availableUntil: '', partId: 9875 },
        152: { material: 'lago_b47', hex: '#ACCFEE', status: 'active', availableUntil: '', partId: 9934 },
        153: { material: 'skydive_b48', hex: '#C0DBF2', status: 'active', availableUntil: '', partId: 9998 },
        154: { material: 'bliss_b49', hex: '#C0D6EF', status: 'active', availableUntil: '', partId: 461 },
        155: { material: 'daydream_b50', hex: '#B0C6DF', status: 'active', availableUntil: '', partId: 9887 },
        156: { material: 'bay_b51', hex: '#87A3C4', status: 'active', availableUntil: '', partId: 9843 },
        157: { material: 'midnight_b52', hex: '#80A4D6', status: 'active', availableUntil: '', partId: 1146 },
        158: { material: 'tahoe_b53', hex: '#436FB2', status: 'active', availableUntil: '', partId: 10013 },
        159: { material: 'nautical_b54', hex: '#4D73A5', status: 'active', availableUntil: '', partId: 9958 },
        160: { material: 'cadet_b55', hex: '#627EA4', status: 'active', availableUntil: '', partId: 9855 },
        161: { material: 'moonstone_b56', hex: '#738FB7', status: 'active', availableUntil: '', partId: 9955 },
        162: { material: 'sparta_b57', hex: '#849ACD', status: 'active', availableUntil: '', partId: 10000 },
        163: { material: 'atlas_b58', hex: '#5D78B7', status: 'active', availableUntil: '', partId: 9837 },
        164: { material: 'hyacinth_b59', hex: '#5B72B2', status: 'active', availableUntil: '', partId: 9923 },
        165: { material: 'mythical_b60', hex: '#2B3C78', status: 'active', availableUntil: '', partId: 9957 },
        166: { material: 'bluejay_b61', hex: '#57678A', status: 'active', availableUntil: '', partId: 9848 },
        167: { material: 'monsoon_b62', hex: '#5B6E80', status: 'active', availableUntil: '', partId: 443 },
        168: { material: 'overcast_b63', hex: '#425559', status: 'active', availableUntil: '', partId: 9964 },
        169: { material: 'majesty_v03', hex: '#383048', status: 'active', availableUntil: '', partId: 9947 },
        170: { material: 'amethyst_v04', hex: '#5C599D', status: 'active', availableUntil: '', partId: 9834 },
        171: { material: 'dahlia_v05', hex: '#8289BF', status: 'active', availableUntil: '', partId: 9883 },
        172: { material: 'lavender_v06', hex: '#8B8EAB', status: 'active', availableUntil: '', partId: 9938 },
        173: { material: 'violet_v07', hex: '#B2B8DA', status: 'active', availableUntil: '', partId: 657 },
        174: { material: 'dawn_v08', hex: '#BDBFDF', status: 'active', availableUntil: '', partId: 9886 },
        175: { material: 'lilac_v09', hex: '#B9B1C8', status: 'active', availableUntil: '', partId: 9940 },
        176: { material: 'boulevard_v10', hex: '#AF9BBA', status: 'active', availableUntil: '', partId: 9850 },
        177: { material: 'iris_v11', hex: '#775B88', status: 'active', availableUntil: '', partId: 9924 },
        178: { material: 'prince_v12', hex: '#732674', status: 'active', availableUntil: '', partId: 9975 },
        179: { material: 'bewitched_v13', hex: '#A57D99', status: 'active', availableUntil: '', partId: 452 },
        180: { material: 'aphrodite_v14', hex: '#B57AA9', status: 'active', availableUntil: '', partId: 9835 },
        181: { material: 'lollipop_v15', hex: '#D9B3D1', status: 'active', availableUntil: '', partId: 9944 },
        182: { material: 'lily_v16', hex: '#E9D9E3', status: 'active', availableUntil: '', partId: 9941 },
        183: { material: 'cosmo_v17', hex: '#F0DAE8', status: 'active', availableUntil: '', partId: 9877 },
        184: { material: 'cupid_v18', hex: '#E8BCD4', status: 'active', availableUntil: '', partId: 9881 },
        185: { material: 'flamingo_v19', hex: '#DC90B7', status: 'active', availableUntil: '', partId: 9903 },
        186: { material: 'sassy_v20', hex: '#DA85A3', status: 'active', availableUntil: '', partId: 458 },
        187: { material: 'dollhouse_v21', hex: '#D36D94', status: 'active', availableUntil: '', partId: 9891 },
        188: { material: 'tamale_v22', hex: '#C63139', status: 'active', availableUntil: '', partId: 10014 },
        189: { material: 'jam_v23', hex: '#C12C42', status: 'active', availableUntil: '', partId: 9926 },
        190: { material: 'hibiscus_v24', hex: '#B73248', status: 'active', availableUntil: '', partId: 9921 },
        191: { material: 'taffy_v25', hex: '#9D3151', status: 'active', availableUntil: '', partId: 10012 },
        192: { material: 'fig_v26', hex: '#4C1C3C', status: 'active', availableUntil: '', partId: 9902 },
        193: { material: 'bohemian_v27', hex: '#7A5A62', status: 'active', availableUntil: '', partId: 9849 },
        194: { material: 'gypsum_n06', hex: '#E9E5CF', status: 'active', availableUntil: '', partId: 9916 },
        195: { material: 'biscotti_n07', hex: '#EBE4D6', status: 'active', availableUntil: '', partId: 9846 },
        196: { material: 'sable_n08', hex: '#E0D4C5', status: 'active', availableUntil: '', partId: 508 },
        197: { material: 'toasted_n09', hex: '#EBE0C1', status: 'active', availableUntil: '', partId: 10020 },
        198: { material: 'melon_n10', hex: '#F0E0BB', status: 'active', availableUntil: '', partId: 9951 },
        199: { material: 'allyssa_n11', hex: '#ECDBBD', status: 'active', availableUntil: '', partId: 9832 },
        200: { material: 'nectar_n12', hex: '#EFE5CF', status: 'active', availableUntil: '', partId: 1538 },
        201: { material: 'glow_n13', hex: '#F9F4D8', status: 'active', availableUntil: '', partId: 496 },
        202: { material: 'lemon_n14', hex: '#F7F1C8', status: 'active', availableUntil: '', partId: 1535 },
        203: { material: 'sunrise_n15', hex: '#F3E7C6', status: 'active', availableUntil: '', partId: 10006 },
        204: { material: 'mellow_n16', hex: '#F4E7B5', status: 'active', availableUntil: '', partId: 9950 },
        205: { material: 'lioness_n17', hex: '#EFE3BF', status: 'active', availableUntil: '', partId: 9942 },
        206: { material: 'fawn_n18', hex: '#DFD0AD', status: 'active', availableUntil: '', partId: 9900 },
        207: { material: 'jicama_n19', hex: '#BEAA78', status: 'active', availableUntil: '', partId: 9930 },
        208: { material: 'almond_n20', hex: '#9A8A64', status: 'active', availableUntil: '', partId: 9833 },
        209: { material: 'saddle_n21', hex: '#9D7B55', status: 'active', availableUntil: '', partId: 9987 },
        210: { material: 'khaki_n22', hex: '#D3CAAB', status: 'active', availableUntil: '', partId: 503 },
        211: { material: 'oat_n23', hex: '#F0EEE4', status: 'active', availableUntil: '', partId: 505 },
        212: { material: 'dew_n24', hex: '#E5E4D1', status: 'active', availableUntil: '', partId: 9890 },
        213: { material: 'farmer_n25', hex: '#B5AA8C', status: 'active', availableUntil: '', partId: 9899 },
        214: { material: 'bittersweet_n26', hex: '#382B1E', status: 'active', availableUntil: '', partId: 9847 },
        215: { material: 'sepia_n27', hex: '#A4937A', status: 'active', availableUntil: '', partId: 9993 },
        216: { material: 'bark_n28', hex: '#8F6D4B', status: 'active', availableUntil: '', partId: 502 },
        217: { material: 'whiskey_n29', hex: '#985A28', status: 'active', availableUntil: '', partId: 10028 },
        218: { material: 'leather_n30', hex: '#532D1D', status: 'active', availableUntil: '', partId: 9939 },
        219: { material: 'redwood_n31', hex: '#AE7757', status: 'active', availableUntil: '', partId: 9980 },
        220: { material: 'blush_n32', hex: '#CAAA93', status: 'active', availableUntil: '', partId: 658 },
        221: { material: 'eggplant_n33', hex: '#A77F6E', status: 'active', availableUntil: '', partId: 654 },
        222: { material: 'teaberry_n34', hex: '#E9DEDB', status: 'active', availableUntil: '', partId: 10016 },
        223: { material: 'concord_n35', hex: '#AD9C9D', status: 'active', availableUntil: '', partId: 655 },
        224: { material: 'compass_n36', hex: '#ABA7A5', status: 'active', availableUntil: '', partId: 9873 },
        225: { material: 'smudge_n37', hex: '#C2C3C0', status: 'active', availableUntil: '', partId: 9999 },
        226: { material: 'zeppelin_n38', hex: '#8D8F91', status: 'active', availableUntil: '', partId: 10033 },
        227: { material: 'alley_n39', hex: '#4C4C53', status: 'active', availableUntil: '', partId: 9831 },
        228: { material: 'gotham_n40', hex: '#282C2E', status: 'active', availableUntil: '', partId: 9914 },
        229: { material: 'cauldron_n41', hex: '#485051', status: 'active', availableUntil: '', partId: 9861 },
        230: { material: 'drizzle_n42', hex: '#B4BDBA', status: 'active', availableUntil: '', partId: 9894 },
        231: { material: 'porpoise_n43', hex: '#C7C9C8', status: 'active', availableUntil: '', partId: 9973 },
        232: { material: 'wolf_n44', hex: '#BDC1C3', status: 'active', availableUntil: '', partId: 10031 },
        233: { material: 'cityscape_n45', hex: '#E3E6EA', status: 'active', availableUntil: '', partId: 9870 },
        234: { material: 'pond_n46', hex: '#EFF5F9', status: 'active', availableUntil: '', partId: 497 },
        235: { material: 'nebulous_n47', hex: '#F7F8F8', status: 'active', availableUntil: '', partId: 9959 },
        236: { material: 'helium_n48', hex: '#F3F4F3', status: 'active', availableUntil: '', partId: 9919 },
        237: { material: 'ash_n49', hex: '#E6E7E7', status: 'active', availableUntil: '', partId: 501 },
        238: { material: 'elephant_n50', hex: '#D9DADB', status: 'active', availableUntil: '', partId: 9897 },
        239: { material: 'thunder_n51', hex: '#D4D4D4', status: 'active', availableUntil: '', partId: 509 },
        240: { material: 'pewter_n52', hex: '#D7D6CF', status: 'active', availableUntil: '', partId: 506 },
        241: { material: 'rockport_n53', hex: '#E7E5DE', status: 'active', availableUntil: '', partId: 9984 },
        242: { material: 'roadside_n54', hex: '#D0CABB', status: 'active', availableUntil: '', partId: 9982 },
        243: { material: 'wren_n55', hex: '#CEC7B6', status: 'active', availableUntil: '', partId: 10032 },
        244: { material: 'warmstone_n56', hex: '#B6B0A3', status: 'active', availableUntil: '', partId: 10026 },
        245: { material: 'galvanize_n57', hex: '#988F89', status: 'active', availableUntil: '', partId: 9905 },
        246: { material: 'noir_n58', hex: '#6A675E', status: 'active', availableUntil: '', partId: 504 },
        247: { material: 'meteorite_n59', hex: '#4C4841', status: 'active', availableUntil: '', partId: 9953 },
        248: { material: 'nightshade_n60', hex: '#423A32', status: 'active', availableUntil: '', partId: 9960 },
        249: { material: 'dust_n61', hex: '#EBE8E4', status: 'active', availableUntil: '', partId: 9895 },
        250: { material: 'clear', hex: '#ffffff', status: 'active', availableUntil: '', partId: 464 }
      }
    }
  }
  constructor() { }
}

export interface PartsSubs {
  'partId': string,
  'replacementPartId': string,
  'effectiveDate': string
}
