import { Injectable, EventEmitter } from '@angular/core';
import { DebugService } from './_services/debug.service';
import *  as _ from 'lodash';

@Injectable()
export class Feature {
  onBuildGrid = new EventEmitter();
  onBuildVeloGrid = new EventEmitter();
  onApplyAll = new EventEmitter();
  onView3d = new EventEmitter();
  onLoadDesigns = new EventEmitter();

  private static _instance: Feature = new Feature();
  private debug: DebugService;

  // attributes saved in DB
  public id: number;
  public uid: number;
  public feature_type: string;
  public design_name: string;
  public project_name: string;
  public specifier: string;
  public width: number;
  public length: number;
  public units: string = "inches";
  public material: string;
  public tile_size: number = 24;
  public tiles: any;
  public design_data_url: any;
  public hardware: any;
  public estimated_amount: number = 0.00;
  public services_amount: number = 0.00;
  public quoted: boolean = false; // boolean
  public archived: boolean = false; // boolean
  public updated_at: string;

  // attributes for the tool
  public tile_type: string = 'tile';
  public selectedTile: string = "01";
  public selectedTool: string;
  public showGuide: boolean = true;
  public materialHex: string;
  public materialType: string;
  public diffusion: string;

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
    }
  };

  public newMaterialsArray = {
    tetria: {
      0: {
        material: 'milky-white',
        image: '/assets/images/materials/felt/merino/milky-white.png'
      },
      1: {
        material: 'heather-gray',
        image: '/assets/images/materials/felt/merino/heather-gray.png'
      },
      2: {
        material: 'charcoal',
        image: '/assets/images/materials/felt/merino/charcoal.png'
      },
      3: {
        material: 'heather-charcoal',
        image: '/assets/images/materials/felt/merino/heather-charcoal.png'
      },
      4: {
        material: 'heather-black',
        image: '/assets/images/materials/felt/merino/heather-black.png'
      },
      5: {
        material: 'black',
        image: '/assets/images/materials/felt/merino/black.png'
      },
      6: {
        material: 'taupe',
        image: '/assets/images/materials/felt/merino/taupe.png'
      },
      7: {
        material: 'heather-taupe',
        image: '/assets/images/materials/felt/merino/heather-taupe.png'
      },
      8: {
        material: 'putty',
        image: '/assets/images/materials/felt/merino/putty.png'
      },
      9: {
        material: 'latte',
        image: '/assets/images/materials/felt/merino/latte.png'
      },
      10: {
        material: 'heather-dark-brown',
        image: '/assets/images/materials/felt/merino/heather-dark-brown.png'
      },
      11: {
        material: 'dark-brown',
        image: '/assets/images/materials/felt/merino/dark-brown.png'
      },
      12: {
        material: 'red',
        image: '/assets/images/materials/felt/merino/red.png'
      },
      13: {
        material: 'crimson',
        image: '/assets/images/materials/felt/merino/crimson.png'
      },
      14: {
        material: 'bordeaux',
        image: '/assets/images/materials/felt/merino/bordeaux.png'
      },
      15: {
        material: 'raspberry-jam',
        image: '/assets/images/materials/felt/merino/raspberry-jam.png'
      },
      16: {
        material: 'royal-purple',
        image: '/assets/images/materials/felt/merino/royal-purple.png'
      },
      17: {
        material: 'midnight-blue',
        image: '/assets/images/materials/felt/merino/midnight-blue.png'
      },
      18: {
        material: 'peacock',
        image: '/assets/images/materials/felt/merino/peacock.png'
      },
      19: {
        material: 'liberty-blue',
        image: '/assets/images/materials/felt/merino/liberty-blue.png'
      },
      20: {
        material: 'deep-turquoise',
        image: '/assets/images/materials/felt/merino/deep-turquoise.png'
      },
      21: {
        material: 'platinum',
        image: '/assets/images/materials/felt/merino/platinum.png'
      },
      22: {
        material: 'sky-blue',
        image: '/assets/images/materials/felt/merino/sky-blue.png'
      },
      23: {
        material: 'teal',
        image: '/assets/images/materials/felt/merino/teal.png'
      },
      24: {
        material: 'hunter-green',
        image: '/assets/images/materials/felt/merino/hunter-green.png'
      },
      25: {
        material: 'avocado',
        image: '/assets/images/materials/felt/merino/avocado.png'
      },
      26: {
        material: 'clover-green',
        image: '/assets/images/materials/felt/merino/clover-green.png'
      },
      27: {
        material: 'goldenrod',
        image: '/assets/images/materials/felt/merino/goldenrod.png'
      },
      28: {
        material: 'camel',
        image: '/assets/images/materials/felt/merino/camel.png'
      },
      29: {
        material: 'orange',
        image: '/assets/images/materials/felt/merino/orange.png'
      }
    },
    clario: {
      0: {
        material: 'zinc',
        image: '/assets/images/materials/felt/sola/zinc.jpg'
      },
      1: {
        material: 'nickel',
        image: '/assets/images/materials/felt/sola/nickel.jpg'
      },
      2: {
        material: 'cashmere',
        image: '/assets/images/materials/felt/sola/cashmere.jpg'
      },
      3: {
        material: 'burnt_umber',
        image: '/assets/images/materials/felt/sola/burnt_umber.jpg'
      },
      4: {
        material: 'ore',
        image: '/assets/images/materials/felt/sola/ore.jpg'
      },
      5: {
        material: 'dark_gray',
        image: '/assets/images/materials/felt/sola/dark_gray.jpg'
      },
      6: {
        material: 'cast',
        image: '/assets/images/materials/felt/sola/cast.jpg'
      },
      7: {
        material: 'ebony',
        image: '/assets/images/materials/felt/sola/ebony.jpg'
      }
    },
    velo: {
      felt: {
        0: {
          material: 'milky-white',
          image: '/assets/images/materials/felt/merino/milky-white.png',
          hex: '#dfdee0'
        },
        1: {
          material: 'heather-gray',
          image: '/assets/images/materials/felt/merino/heather-gray.png',
          hex: '#babbbe'
        },
        2: {
          material: 'charcoal',
          image: '/assets/images/materials/felt/merino/charcoal.png',
          hex: '#445062'
        },
        3: {
          material: 'heather-charcoal',
          image: '/assets/images/materials/felt/merino/heather-charcoal.png',
          hex: '#5e616d'
        },
        4: {
          material: 'heather-black',
          image: '/assets/images/materials/felt/merino/heather-black.png',
          hex: '#353542'
        },
        5: {
          material: 'black',
          image: '/assets/images/materials/felt/merino/black.png',
          hex: '#20232d'
        },
        6: {
          material: 'taupe',
          image: '/assets/images/materials/felt/merino/taupe.png',
          hex: '#b7a7a3'
        },
        7: {
          material: 'heather-taupe',
          image: '/assets/images/materials/felt/merino/heather-taupe.png',
          hex: '#b3aaa4'
        },
        8: {
          material: 'putty',
          image: '/assets/images/materials/felt/merino/putty.png',
          hex: '#8e7476'
        },
        9: {
          material: 'latte',
          image: '/assets/images/materials/felt/merino/latte.png',
          hex: '#a15532'
        },
        10: {
          material: 'heather-dark-brown',
          image: '/assets/images/materials/felt/merino/heather-dark-brown.png',
          hex: '#54393a'
        },
        11: {
          material: 'dark-brown',
          image: '/assets/images/materials/felt/merino/dark-brown.png',
          hex: '#382228'
        },
        12: {
          material: 'red',
          image: '/assets/images/materials/felt/merino/red.png',
          hex: '#e20000'
        },
        13: {
          material: 'crimson',
          image: '/assets/images/materials/felt/merino/crimson.png',
          hex: '#bf001f'
        },
        14: {
          material: 'bordeaux',
          image: '/assets/images/materials/felt/merino/bordeaux.png',
          hex: '#700229'
        },
        15: {
          material: 'raspberry-jam',
          image: '/assets/images/materials/felt/merino/raspberry-jam.png',
          hex: '#bb0058'
        },
        16: {
          material: 'royal-purple',
          image: '/assets/images/materials/felt/merino/royal-purple.png',
          hex: '#481a6d'
        },
        17: {
          material: 'midnight-blue',
          image: '/assets/images/materials/felt/merino/midnight-blue.png',
          hex: '#22234e'
        },
        18: {
          material: 'peacock',
          image: '/assets/images/materials/felt/merino/peacock.png',
          hex: '#003363'
        },
        19: {
          material: 'liberty-blue',
          image: '/assets/images/materials/felt/merino/liberty-blue.png',
          hex: '#005db0'
        },
        20: {
          material: 'deep-turquoise',
          image: '/assets/images/materials/felt/merino/deep-turquoise.png',
          hex: '#006ecb'
        },
        21: {
          material: 'platinum',
          image: '/assets/images/materials/felt/merino/platinum.png',
          hex: '#8a95a6'
        },
        22: {
          material: 'sky-blue',
          image: '/assets/images/materials/felt/merino/sky-blue.png',
          hex: '#01a5d4'
        },
        23: {
          material: 'teal',
          image: '/assets/images/materials/felt/merino/teal.png',
          hex: '#00a494'
        },
        24: {
          material: 'hunter-green',
          image: '/assets/images/materials/felt/merino/hunter-green.png',
          hex: '#003b39'
        },
        25: {
          material: 'avocado',
          image: '/assets/images/materials/felt/merino/avocado.png',
          hex: '#778a00'
        },
        26: {
          material: 'clover-green',
          image: '/assets/images/materials/felt/merino/clover-green.png',
          hex: '#019a00'
        },
        27: {
          material: 'goldenrod',
          image: '/assets/images/materials/felt/merino/goldenrod.png',
          hex: '#ffb300'
        },
        28: {
          material: 'camel',
          image: '/assets/images/materials/felt/merino/camel.png',
          hex: '#dfa77b'
        },
        29: {
          material: 'orange',
          image: '/assets/images/materials/felt/merino/orange.png',
          hex: '#ff6c00'
        }
      },
      varia: {
        0: {material: 'bashful_r10', hex: '#E2A494'},
        1: {material: 'coral_r11', hex: '#EDCAB3'},
        2: {material: 'cosmetic_r12', hex: '#EED0B9'},
        3: {material: 'nude_r13', hex: '#F4E2C9'},
        4: {material: 'ginger_r14', hex: '#EDC19F'},
        5: {material: 'salmon_r15', hex: '#E4A786'},
        6: {material: 'sherbet_r16', hex: '#D2663F'},
        7: {material: 'cranberry_r17', hex: '#C72F1D'},
        8: {material: 'love_r18', hex: '#C5221C'},
        9: {material: 'jello_r19', hex: '#BB241C'},
        10: {material: 'gypsy_r20', hex: '#B03F1F'},
        11: {material: 'strawberry_r21', hex: '#8D241E'},
        12: {material: 'garnet_r22', hex: '#852426'},
        13: {material: 'desire_r23', hex: '#922822'},
        14: {material: 'radish_r24', hex: '#A72020'},
        15: {material: 'sweetheart_r25', hex: '#A32023'},
        16: {material: 'daredevil_r26', hex: '#B12020'},
        17: {material: 'spunky_r27', hex: '#C32920'},
        18: {material: 'rouge_r28', hex: '#BD2225'},
        19: {material: 'gladiola_r29', hex: '#CB7177'},
        20: {material: 'peony_r30', hex: '#E4C1BB'},
        21: {material: 'petal_r31', hex: '#EAD2D3'},
        22: {material: 'powder-puff_r32', hex: '#F0E5E2'},
        23: {material: 'azalea_r33', hex: '#EAD4C8'},
        24: {material: 'begonia_r34', hex: '#E8B6B0'},
        25: {material: 'watermelon_r35', hex: '#DC8B8F'},
        26: {material: 'dragonfruit_r36', hex: '#D46C74'},
        27: {material: 'pomegranate_r37', hex: '#A1382E'},
        28: {material: 'beet_r38', hex: '#67242A'},
        29: {material: 'merlot_r39', hex: '#451A2E'},
        30: {material: 'clementine_o07', hex: '#E09A20'},
        31: {material: 'carnival_o08', hex: '#D98022'},
        32: {material: 'oj_o09', hex: '#DC8B21'},
        33: {material: 'festive_o10', hex: '#CF5F20'},
        34: {material: 'chipotle_o11', hex: '#BF5721'},
        35: {material: 'persimmon_o12', hex: '#CE5820'},
        36: {material: 'jubilee_o13', hex: '#D7792B'},
        37: {material: 'charmer_o14', hex: '#DF963B'},
        38: {material: 'butternut_o15', hex: '#DF9620'},
        39: {material: 'giraffe_o16', hex: '#C9992B'},
        40: {material: 'curry_o17', hex: '#CE8827'},
        41: {material: 'marmalade_o18', hex: '#D5994A'},
        42: {material: 'shrimp_o19', hex: '#EDC28D'},
        43: {material: 'mai-tai_o20', hex: '#DB8549'},
        44: {material: 'punch_o21', hex: '#D67242'},
        45: {material: 'paprika_o22', hex: '#B3381D'},
        46: {material: 'butterscotch_y06', hex: '#CFAE61'},
        47: {material: 'couscous_y07', hex: '#EBCD76'},
        48: {material: 'gardenia_y08', hex: '#EEDB9F'},
        49: {material: 'morning_y09', hex: '#F9EFC0'},
        50: {material: 'daffodil_y10', hex: '#F3E6A4'},
        51: {material: 'vitamin-c_y11', hex: '#F4E088'},
        52: {material: 'taxicab_y12', hex: '#F0D059'},
        53: {material: 'golden_y13', hex: '#DEC046'},
        54: {material: 'squash_y14', hex: '#EDC742'},
        55: {material: 'tiger_y15', hex: '#EAB51D'},
        56: {material: 'pharaoh_y16', hex: '#EEC421'},
        57: {material: 'sunnyside_y17', hex: '#F1CA45'},
        58: {material: 'butter_y18', hex: '#F4E77E'},
        59: {material: 'daisy_y19', hex: '#F1DD3A'},
        60: {material: 'chirp_y20', hex: '#F4E445'},
        61: {material: 'marigold_y21', hex: '#F4EC90'},
        62: {material: 'springtime_y22', hex: '#F6F3B7'},
        63: {material: 'camel_y23', hex: '#EBE2A0'},
        64: {material: 'wafer_y24', hex: '#DDCD8C'},
        65: {material: 'cider_y25', hex: '#CEBC6F'},
        66: {material: 'syrup_y26', hex: '#907135'},
        67: {material: 'glazed_g15', hex: '#EBEAD4'},
        68: {material: 'pickle_g16', hex: '#EBE9C8'},
        69: {material: 'lark_g17', hex: '#E2E1C5'},
        70: {material: 'pear_g18', hex: '#E6E8D3'},
        71: {material: 'cucumber_g19', hex: '#E4E7CC'},
        72: {material: 'nomad_g20', hex: '#CECDB6'},
        73: {material: 'chai_g21', hex: '#736633'},
        74: {material: 'terrace_g22', hex: '#A99B5C'},
        75: {material: 'swamp_g23', hex: '#BFB98A'},
        76: {material: 'hickory_g24', hex: '#C4B944'},
        77: {material: 'vegan_g25', hex: '#C9C641'},
        78: {material: 'citron_g26', hex: '#DFDB54'},
        79: {material: 'acre_g27', hex: '#C2CC54'},
        80: {material: 'turtle_g28', hex: '#BACE4D'},
        81: {material: 'guacamole_g29', hex: '#DDE187'},
        82: {material: 'minnow_g30', hex: '#D9E3C3'},
        83: {material: 'garden_g31', hex: '#E8EAA1'},
        84: {material: 'sweet-pea_g32', hex: '#E6E99D'},
        85: {material: 'moss_g33', hex: '#CBD58A'},
        86: {material: 'marsh_g34', hex: '#B9C583'},
        87: {material: 'rainforest_g35', hex: '#9AA26A'},
        88: {material: 'basil_g36', hex: '#94A551'},
        89: {material: 'apple_g37', hex: '#B3CA86'},
        90: {material: 'rosemary_g38', hex: '#CDD498'},
        91: {material: 'laurel_g39', hex: '#89AE6F'},
        92: {material: 'cilantro_g40', hex: '#63924A'},
        93: {material: 'tropical_g41', hex: '#6FAE45'},
        94: {material: 'lawn_g42', hex: '#AECB76'},
        95: {material: 'thyme_g43', hex: '#C8DA90'},
        96: {material: 'zucchini_g44', hex: '#CBDCA5'},
        97: {material: 'rivulet_g45', hex: '#9BB89E'},
        98: {material: 'oregano_g46', hex: '#89B18C'},
        99: {material: 'shamrock_g47', hex: '#65AF81'},
        100: {material: 'lucky_g48', hex: '#5B957D'},
        101: {material: 'isle_g49', hex: '#6B887A'},
        102: {material: 'seine_g50', hex: '#98C8BC'},
        103: {material: 'awash_g51', hex: '#CDE0CE'},
        104: {material: 'pixie_g52', hex: '#9AC9C1'},
        105: {material: 'capri_g53', hex: '#67B3AB'},
        106: {material: 'persian_g54', hex: '#53AB9C'},
        107: {material: 'kilt_g55', hex: '#30A08D'},
        108: {material: 'emperor_g56', hex: '#51927D'},
        109: {material: 'julep_g57', hex: '#72B594'},
        110: {material: 'eden_g58', hex: '#CADEB4'},
        111: {material: 'jardin_g59', hex: '#DBE9DE'},
        112: {material: 'aloe_g60', hex: '#E9ECDD'},
        113: {material: 'sapling_g61', hex: '#DAE1C6'},
        114: {material: 'wintergreen_g62', hex: '#DCE4C6'},
        115: {material: 'copen_g63', hex: '#E5EACA'},
        116: {material: 'jewel_b11', hex: '#3D6F6C'},
        117: {material: 'saltwater_b12', hex: '#35747F'},
        118: {material: 'venice_b13', hex: '#4DABB2'},
        119: {material: 'sea_b14', hex: '#9AC9C1'},
        120: {material: 'cayman_b15', hex: '#B0D5D5'},
        121: {material: 'swan-dive_b16', hex: '#BCDAD6'},
        122: {material: 'heron_b17', hex: '#D2E5E6'},
        123: {material: 'reef_b18', hex: '#DDE9E6'},
        124: {material: 'seahorse_b19', hex: '#E9F2EC'},
        125: {material: 'buoyant_b20', hex: '#DBEAE0'},
        126: {material: 'cruise_b21', hex: '#94C9DA'},
        127: {material: 'poseidon_b22', hex: '#5EABC2'},
        128: {material: 'calypso_b23', hex: '#2288B1'},
        129: {material: 'matisse_b24', hex: '#469ACF'},
        130: {material: 'cobalt_b25', hex: '#4C8FCC'},
        131: {material: 'cassidy_b26', hex: '#396BAF'},
        132: {material: 'catalina_b27', hex: '#2C5BA2'},
        133: {material: 'dory_b28', hex: '#1C6EAE'},
        134: {material: 'lapis_b29', hex: '#1D5B99'},
        135: {material: 'wizard_b30', hex: '#2F4A70'},
        136: {material: 'denim_b31', hex: '#628CAF'},
        137: {material: 'harbor_b32', hex: '#5A94AF'},
        138: {material: 'mariner_b33', hex: '#7C9FA6'},
        139: {material: 'loch_b34', hex: '#8DA6AA'},
        140: {material: 'atlantic_b35', hex: '#89AAB9'},
        141: {material: 'raindrop_b36', hex: '#97C3DB'},
        142: {material: 'shoreline_b37', hex: '#7EC0DC'},
        143: {material: 'surf_b38', hex: '#BBDCE9'},
        144: {material: 'robin_b39', hex: '#D3E7EF'},
        145: {material: 'tide_b40', hex: '#E3EDF3'},
        146: {material: 'aviator_b41', hex: '#DAE3E7'},
        147: {material: 'cloudless_b42', hex: '#DEEAF4'},
        148: {material: 'fountain_b43', hex: '#B3D6ED'},
        149: {material: 'flood_b44', hex: '#A1CDEA'},
        150: {material: 'pier_b45', hex: '#77B0E1'},
        151: {material: 'cornflower_b46', hex: '#92C4ED'},
        152: {material: 'lago_b47', hex: '#ACCFEE'},
        153: {material: 'skydive_b48', hex: '#C0DBF2'},
        154: {material: 'bliss_b49', hex: '#C0D6EF'},
        155: {material: 'daydream_b50', hex: '#B0C6DF'},
        156: {material: 'bay_b51', hex: '#87A3C4'},
        157: {material: 'midnight_b52', hex: '#80A4D6'},
        158: {material: 'tahoe_b53', hex: '#436FB2'},
        159: {material: 'nautical_b54', hex: '#4D73A5'},
        160: {material: 'cadet_b55', hex: '#627EA4'},
        161: {material: 'moonstone_b56', hex: '#738FB7'},
        162: {material: 'sparta_b57', hex: '#849ACD'},
        163: {material: 'atlas_b58', hex: '#5D78B7'},
        164: {material: 'hyacinth_b59', hex: '#5B72B2'},
        165: {material: 'mythical_b60', hex: '#2B3C78'},
        166: {material: 'bluejay_b61', hex: '#57678A'},
        167: {material: 'monsoon_b62', hex: '#5B6E80'},
        168: {material: 'overcast_b63', hex: '#425559'},
        169: {material: 'majesty_v03', hex: '#383048'},
        170: {material: 'amethyst_v04', hex: '#5C599D'},
        171: {material: 'dahlia_v05', hex: '#8289BF'},
        172: {material: 'lavender_v06', hex: '#8B8EAB'},
        173: {material: 'violet_v07', hex: '#B2B8DA'},
        174: {material: 'dawn_v08', hex: '#BDBFDF'},
        175: {material: 'lilac_v09', hex: '#B9B1C8'},
        176: {material: 'boulevard_v10', hex: '#AF9BBA'},
        177: {material: 'iris_v11', hex: '#775B88'},
        178: {material: 'prince_v12', hex: '#732674'},
        179: {material: 'bewitched_v13', hex: '#A57D99'},
        180: {material: 'aphrodite_v14', hex: '#B57AA9'},
        181: {material: 'lollipop_v15', hex: '#D9B3D1'},
        182: {material: 'lily_v16', hex: '#E9D9E3'},
        183: {material: 'cosmo_v17', hex: '#F0DAE8'},
        184: {material: 'cupid_v18', hex: '#E8BCD4'},
        185: {material: 'flamingo_v19', hex: '#DC90B7'},
        186: {material: 'sassy_v20', hex: '#DA85A3'},
        187: {material: 'dollhouse_v21', hex: '#D36D94'},
        188: {material: 'tamale_v22', hex: '#C63139'},
        189: {material: 'jam_v23', hex: '#C12C42'},
        190: {material: 'hibiscus_v24', hex: '#B73248'},
        191: {material: 'taffy_v25', hex: '#9D3151'},
        192: {material: 'fig_v26', hex: '#4C1C3C'},
        193: {material: 'bohemian_v27', hex: '#7A5A62'},
        194: {material: 'gypsum_n06', hex: '#E9E5CF'},
        195: {material: 'biscotti_n07', hex: '#EBE4D6'},
        196: {material: 'sable_n08', hex: '#E0D4C5'},
        197: {material: 'toasted_n09', hex: '#EBE0C1'},
        198: {material: 'melon_n10', hex: '#F0E0BB'},
        199: {material: 'allyssa_n11', hex: '#ECDBBD'},
        200: {material: 'nectar_n12', hex: '#EFE5CF'},
        201: {material: 'glow_n13', hex: '#F9F4D8'},
        202: {material: 'lemon_n14', hex: '#F7F1C8'},
        203: {material: 'sunrise_n15', hex: '#F3E7C6'},
        204: {material: 'mellow_n16', hex: '#F4E7B5'},
        205: {material: 'lioness_n17', hex: '#EFE3BF'},
        206: {material: 'fawn_n18', hex: '#DFD0AD'},
        207: {material: 'jicama_n19', hex: '#BEAA78'},
        208: {material: 'almond_n20', hex: '#9A8A64'},
        209: {material: 'saddle_n21', hex: '#9D7B55'},
        210: {material: 'khaki_n22', hex: '#D3CAAB'},
        211: {material: 'oat_n23', hex: '#F0EEE4'},
        212: {material: 'dew_n24', hex: '#E5E4D1'},
        213: {material: 'farmer_n25', hex: '#B5AA8C'},
        214: {material: 'bittersweet_n26', hex: '#382B1E'},
        215: {material: 'sepia_n27', hex: '#A4937A'},
        216: {material: 'bark_n28', hex: '#8F6D4B'},
        217: {material: 'whiskey_n29', hex: '#985A28'},
        218: {material: 'leather_n30', hex: '#532D1D'},
        219: {material: 'redwood_n31', hex: '#AE7757'},
        220: {material: 'blush_n32', hex: '#CAAA93'},
        221: {material: 'eggplant_n33', hex: '#A77F6E'},
        222: {material: 'teaberry_n34', hex: '#E9DEDB'},
        223: {material: 'concord_n35', hex: '#AD9C9D'},
        224: {material: 'compass_n36', hex: '#ABA7A5'},
        225: {material: 'smudge_n37', hex: '#C2C3C0'},
        226: {material: 'zeppelin_n38', hex: '#8D8F91'},
        227: {material: 'alley_n39', hex: '#4C4C53'},
        228: {material: 'gotham_n40', hex: '#282C2E'},
        229: {material: 'cauldron_n41', hex: '#485051'},
        230: {material: 'drizzle_n42', hex: '#B4BDBA'},
        231: {material: 'porpoise_n43', hex: '#C7C9C8'},
        232: {material: 'wolf_n44', hex: '#BDC1C3'},
        233: {material: 'cityscape_n45', hex: '#E3E6EA'},
        234: {material: 'pond_n46', hex: '#EFF5F9'},
        235: {material: 'nebulous_n47', hex: '#F7F8F8'},
        236: {material: 'helium_n48', hex: '#F3F4F3'},
        237: {material: 'ash_n49', hex: '#E6E7E7'},
        238: {material: 'elephant_n50', hex: '#D9DADB'},
        239: {material: 'thunder_n51', hex: '#D4D4D4'},
        240: {material: 'pewter_n52', hex: '#D7D6CF'},
        241: {material: 'rockport_n53', hex: '#E7E5DE'},
        242: {material: 'roadside_n54', hex: '#D0CABB'},
        243: {material: 'wren_n55', hex: '#CEC7B6'},
        244: {material: 'warmstone_n56', hex: '#B6B0A3'},
        245: {material: 'galvanize_n57', hex: '#988F89'},
        246: {material: 'noir_n58', hex: '#6A675E'},
        247: {material: 'meteorite_n59', hex: '#4C4841'},
        248: {material: 'nightshade_n60', hex: '#423A32'},
        249: {material: 'dust_n61', hex: '#EBE8E4'},
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

  public gridData: any;

  constructor() {
    if (Feature._instance) {
      return Feature._instance;
    }

    Feature._instance = this;
  }

  setDesign(design: any) {
    this.id = design.id;
    this.uid = design.uid;
    this.feature_type = design.feature_type;
    this.design_name = design.design_name;
    this.project_name = design.project_name;
    this.specifier = design.specifier;
    this.width = design.width;
    this.length = design.length;
    this.units = design.units;
    this.material = design.material;
    this.tile_size = design.tile_size;
    this.design_data_url = design.design_data_url;
    this.tiles = JSON.parse(design.tiles);
    this.hardware = JSON.parse(design.hardware);
    this.estimated_amount = design.estimated_amount;
    this.services_amount = design.services_amount;
    this.gridData = JSON.parse(design.grid_data);
    this.quoted = design.quoted;
    this.archived = design.archived;
    this.updated_at = design.updated_at;

    // after it's been loaded, recalculate the price if the design
    // hasn't been quoted. In the event that the prices have changed.
    if(!this.quoted) {
      this.updateEstimatedAmount();
    }
    this.buildGrid();
  }

  public reset() {
    this.design_name = undefined;
    this.width = undefined;
    this.length = undefined;
    this.gridData = undefined;
    this.estimated_amount = 0.00;
  }

  updateEstimatedAmount() {
    var tilesArray = this.getTilesPurchasedArray();

    // TETRIA
    if(this.feature_type == 'tetria') {
      var flatTilePrice = 15.45;
      var tetriaTilePrice = 82.40;
      var tileWeight = 1.55;
      var flatTileCount = 0;
      var tetriaTileCount = 0;
      var tetriaTiles = ["01","02","03"];

      for (var tile in tilesArray) {
        var currentTile = tilesArray[tile];
        if(tetriaTiles.indexOf(currentTile.tile) != -1) {
          // add the purchased amount to the tetria tile count
          tetriaTileCount += currentTile.purchased;
        }else if(currentTile.tile == "00"){
          // add the purchased amount to the flat tile count
          flatTileCount += currentTile.purchased;
        }
      }
      this.services_amount = (tetriaTileCount * tetriaTilePrice) + (flatTileCount * flatTilePrice);
      this.estimated_amount = this.services_amount;
    } // END TETRIA

    // CLARIO
    if(this.feature_type == 'clario') {
      let products_amount: number = 0.00;
      let clario24TileCount = 0;
      let clario48TileCount = 0;
      let clario00TileCount = 0;
      let sheetsNeeded: number = 0;
      let sheetCost: number = 0.00;
      for (let tile in tilesArray) {
        let currentTile = tilesArray[tile];
        if(currentTile.tile == "24") {
          // 24x24 prices
          clario24TileCount += currentTile.purchased;
          // what part_id is the material?
          // how many sheets do we need? sheetsNeeded = (currentTile.purchased / 4);
          sheetsNeeded = currentTile.purchased / 4;
        }else if(currentTile.tile == "48") {
          // 24x48 prices
          clario48TileCount += currentTile.purchased;
          sheetsNeeded = currentTile.purchased / 2;
        } else if(currentTile.tile == "00") {
          // 00 flat tiles
          clario00TileCount += currentTile.purchased;
          sheetsNeeded = currentTile.purchased / 4;
        }

        // calculate the sheet cost and add it to the products_amount
        sheetCost = sheetsNeeded * 48.93;
        products_amount += sheetCost;
      }

      // SERVICES AMOUNT
      let clarioBaffleServiceCost = 46.13;
      let clarioFlatTileServiceCost = 23.81;
      let totalClarioBaffles = clario24TileCount + clario48TileCount;

      this.services_amount = (totalClarioBaffles * clarioBaffleServiceCost) + (clario00TileCount * clarioFlatTileServiceCost);
      // END SERVICES AMOUNT

      this.estimated_amount = this.services_amount + products_amount;
    } // END CLARIO

    // VELO - felt is the same as Tetria - everything in services
    if(this.feature_type == 'velo') {
      // PRODUCTS AMOUNT
      let veloFeltTiles: number = 0;
      let veloVariaTiles: number = 0;
      let veloVariaDiffusionTiles: number = 0;
      let products_amount: number;
      let variaSheetsNeeded: number;
      let variaDiffusionSheetsNeeded: number;
      let variaSheetCost: number = 488.14;
      let variaDiffusionSheetCost: number = variaSheetCost + 100.00;

      for(let tile in tilesArray) {
        currentTile = tilesArray[tile];
        if(currentTile.materialType == 'felt') {
          veloFeltTiles += currentTile.purchased;
        }else{
          if(typeof currentTile.diffusion == 'undefined') {
            veloVariaTiles += currentTile.purchased;
          }else{
            veloVariaDiffusionTiles += currentTile.purchased;
          }
        }
      }

      variaSheetsNeeded = Math.ceil(veloVariaTiles / 8);
      variaDiffusionSheetsNeeded = Math.ceil(veloVariaDiffusionTiles / 8);
      console.log("varia sheets needed", variaSheetsNeeded);
      console.log("varia diffusion sheets needed", variaDiffusionSheetsNeeded);
      products_amount = (variaSheetsNeeded * variaSheetCost) + (variaDiffusionSheetsNeeded * variaDiffusionSheetCost);

      // SERVICES AMOUNT
      let veloFeltServiceCost: number = 77.25;
      let veloVariaServiceCost: number = 78.75;
      this.services_amount = (veloFeltTiles * veloFeltServiceCost) + ((veloVariaTiles + veloVariaDiffusionTiles) * veloVariaServiceCost);
      // console.log('=== SERVICES AMOUNT ===');
      // console.log(this.services_amount);

      // HARDWARE AMOUNT
      let hardware_amount: number;
      let hardwareCost: number = 0.00;
      let cableCount: number;
      let cableCost: number = 0.00;
      let cableKitCost = 12.46;
      let variaConnectionKitCost = 6.85;
      let feltConnectionKitCost = .46;
      let drillBitCost = 10.23;
      let variaPunchToolCost = 17.49;
      let variaConnectionKitsNeeded: number = 0;
      let feltConnectionKitsNeeded: number = 0;
      let cablesNeeded: number = 0;
      let variaPunchToolNeeded: boolean = false;

      // CABLE COST CALCULATION
      // we need to calculate the cable hardware for each individual island
      // and then add them together at the end for a total amount.
      let islands = this.getIslands();
      console.log('islands', islands);
      for (let i in islands) {
        let island = islands[i];
        let tilesInIsland = island.length;
        let islandConnections = this.getVeloConnections(island);
        let sharedEdges = islandConnections['totalConnections'];

        // ratio = (number_of_shared_edges / number_of_tiles)
        // if ratio < 1 then cableCount = Math.ceil(cables * .75)
        // if ratio > 1 then cableCount = Math.ceil(cables * .5)
        // this is the total number of purchased tiles
        // this is the number of tiles in the design
        let ratio = (sharedEdges) / (tilesInIsland);
        let factor = ratio < 1 ? .75 : .5;
        cableCount = Math.ceil(tilesInIsland * factor);

        // If shared edges is 1 less than total tiles, set cableCount to sharedEdges
        if(sharedEdges + 1 == tilesInIsland) {
          cableCount = sharedEdges;
        }
        // Minimum of 2 cables.
        cableCount = cableCount < 2 ? 2 : cableCount;
        cableCost += cableCount * cableKitCost;

        // Add the cables for this island to the total cables needed
        cablesNeeded += cableCount;

        // Calculate the hardware cost for connections and add to the hardware cost
        hardwareCost += (islandConnections['variaToVaria'] * variaConnectionKitCost) + ((islandConnections['feltToFelt'] + islandConnections['variaToFelt']) * feltConnectionKitCost);

        // Add the connections to the running total
        variaConnectionKitsNeeded += islandConnections['variaToVaria'];
        feltConnectionKitsNeeded += islandConnections['variaToFelt'] + islandConnections['feltToFelt'];

        console.log('=======================');
        console.log('shared edges:', sharedEdges);
        console.log('total tiles:', tilesInIsland);
        console.log('connections', islandConnections);
        console.log('ratio:', ratio);
        console.log('factor:', factor);
        console.log('cables: ', cableCount);
        console.log('///////////////////////');
      }
      // END CABLE COST CALCULATION

      console.log('Total Cable cost: ', cableCost);
      console.log('Total hardware cost: ', hardwareCost);
      console.log('Varia Kits needed: ', variaConnectionKitsNeeded);
      console.log('Felt Kits needed: ', feltConnectionKitsNeeded);
      console.log('Total cables needed: ', cablesNeeded);
      hardware_amount = cableCost + hardwareCost + drillBitCost;
      if(this.veloHasVaria()) {
        hardware_amount += variaPunchToolCost;
        variaPunchToolNeeded = true;
      }

      this.estimated_amount = this.services_amount + products_amount + hardware_amount;

      // save the hardware amounts
      this.hardware = {
        "3-15-8812": 1, // drillBit
        "3-15-1677-K": cablesNeeded,
        "3-15-8899-K": variaConnectionKitsNeeded,
        "3-85-105-K": feltConnectionKitsNeeded,
        "3-15-8813": variaPunchToolNeeded ? 1 : 0
      }
    }
    // END VELO
    console.log('===== HARDWARE ARRAY =====');
    console.log(this.hardware);
    console.log('===== END HARDWARE ARRAY =====');
    return this.estimated_amount;
  }

  updateSelectedTile(tile: string) {
    this.selectedTile = tile;

    // if a tool is selected then remove it
    if(this.selectedTool != '') {
      this.selectedTool = '';
    }
  }

  updateSelectedMaterial(material: string, hex: string = "", materialType: string = "felt") {
    this.material = material;

    // set the hex value as well if not blank
    if(hex != "") {
      this.materialHex = hex;
    }

    // set the materialType as well
    this.materialType = materialType;

    // if a tool is selected then remove it
    if(this.selectedTool != '') {
      this.selectedTool = '';
    }
  }

  updateSelectedTool(tool: string) {
    var oldTool = this.selectedTool;
    var newTool = tool;
    // if the tool they clicked on is already selected,
    // deselect it so they have a way to add tiles again.
    if (this.selectedTool == tool) {
      this.selectedTool = '';
    }else{
      this.selectedTool = tool;
    }
  }

  updateSelectedDiffusion(diffusion: string) {
    // if the diffusion they clicked on is already selected,
    // deselect it so they have a way to remove the diffusion
    if (this.diffusion == diffusion) {
      this.diffusion = '';
    }else{
      this.diffusion = diffusion;
    }
  }

  buildGrid() {
    // If the feature type is velo build that grid
    if(this.feature_type == 'velo') {
      this.onBuildVeloGrid.emit();
    }else{
      // emit an event to build a new grid
      this.onBuildGrid.emit();
    }
  }

  clearAll() {
    this.gridData = undefined;
    this.estimated_amount = 0.00;
    this.buildGrid();
  }

  applyAll() {
    this.updateEstimatedAmount();
    this.onApplyAll.emit();
  }

  toggleGuide() {
    this.showGuide = !this.showGuide;
    if(this.feature_type == 'velo') {
      this.onBuildVeloGrid.emit();
    }
  }

  view3d() {
    this.onView3d.emit();
  }

  loadDesigns() {
    this.onLoadDesigns.emit();
  }

  public getRows() {
    var rows: number;

    // velo has a static grid
    if(this.feature_type == 'velo') {
      rows = 500;
    }else if(this.units == 'inches') {
      rows = Math.ceil(this.length / 12 / 2);
    }else{
      rows = Math.ceil(this.convertCMtoIN(this.length) / 12 / 2);
    }
    return rows;
  }

  public getColumns() {
    var columns: number;

    // velo has a static grid
    if(this.feature_type == 'velo') {
      columns = 820;
    }else if(this.units == 'inches') {
      columns = Math.ceil(this.width / 12 / 2);
    }else{
      columns = Math.ceil(this.convertCMtoIN(this.width) / 12 / 2);
    }
    return columns;
  }

  public getFeatureTypeInteger() {
    var type: number;
    switch (this.feature_type) {
      case "tetria":
        type = 100;
        break;

      case "clario":
        type = 200;
        break;

      case "velo":
        type = 300;
        break;

      // default to tetria
      default:
        type = 100;
        break;
    }

    return type;
  }

  public getTileType(grammar: string = 'singular') {
    var type: string = '';
    if(grammar == 'plural') {
      type = this.feature_type == 'clario' ? 'baffles' : 'tiles';
    }else{
      type = this.feature_type == 'clario' ? 'baffle' : 'tile';
    }
    return type;
  }

  public getPackageQty(tile: string) {
    var qty: number = 0;
    switch (tile) {
      case "00":
      case "01":
      case "02":
      case "03":
      case "24":
        qty = 4;
        break;

      case "48":
        qty = 2;
        break;

      case "concave":
      case "convex":
      case "velo":
        qty = 8;
        break;

      default:
        qty = 4;
        break;
    }
    return qty;
  }

  public getTilesUsed() {
    if(this.gridData) {
      var totalTiles = 0;
      for (var i = this.gridData.length - 1; i >= 0; i--) {
        for (var j = this.gridData[i].length - 1; j >= 0; j--) {
          if(this.gridData[i][j].tile) {
            totalTiles++;
          }
        }
      }
      return totalTiles;
    }else{
      return 0;
    }
  }

  public getTilesPurchasedArray() {
    let tiles = [];
    if(this.feature_type == 'velo') {
      let pkgQty: number = this.getPackageQty('velo');
      let gridTiles = this.veloTiles();
      let purchasedTiles = [];

      for (let tile in gridTiles) {
        let key = gridTiles[tile].materialType + '-' + gridTiles[tile].material + '-' + gridTiles[tile].diffusion;
        if(purchasedTiles[key]) {
          purchasedTiles[key][gridTiles[tile].tile] += 1;
          purchasedTiles[key].purchased = pkgQty * Math.ceil((purchasedTiles[key].concave + purchasedTiles[key].convex) / pkgQty);
        }else{
          purchasedTiles[key] = {
            "purchased": pkgQty,
            "image": gridTiles[tile].materialType == 'felt' ? '/assets/images/materials/felt/merino/' + gridTiles[tile].material + '.png' : '/assets/images/tiles/00/' + gridTiles[tile].material + '.png',
            "hex": gridTiles[tile].materialType == 'varia' ? gridTiles[tile].hex : '',
            "convex": gridTiles[tile].tile == 'convex' ? 1 : 0,
            "concave": gridTiles[tile].tile == 'concave' ? 1 : 0,
            "material": gridTiles[tile].material,
            "materialType": gridTiles[tile].materialType,
            "tile": gridTiles[tile].tile,
            "diffusion": gridTiles[tile].diffusion
          }
        }
      }
      tiles = purchasedTiles;
    }else{
      // Determine the number of unique tiles (color and tile)
      var pkgQty: number;
      var tileType = this.getTileType('plural');
      if(this.gridData) {
        for (var i = this.gridData.length - 1; i >= 0; i--) {
          for (var j = this.gridData[i].length - 1; j >= 0; j--) {
            if(this.gridData[i][j].tile) {
              var key = this.gridData[i][j]['material'] + '-' + this.gridData[i][j]['tile'];
              var pkgQty = this.getPackageQty(this.gridData[i][j]['tile']);
              if(tiles[key]) {
                tiles[key].used += 1;
                tiles[key].purchased = pkgQty * Math.ceil(tiles[key].used / pkgQty);
              }else{
                if(this.gridData[i][j]['tile'] == "00") {
                  tileType = "tiles";
                }else{
                  tileType = this.getTileType('plural');
                }
                tiles[key] = {
                  "purchased": pkgQty,
                  "image": "/assets/images/" + tileType + "/" + this.gridData[i][j]['tile'] + "/" + this.gridData[i][j]['material'] + ".png",
                  "used": 1,
                  "material": this.gridData[i][j]['material'],
                  "tile": this.gridData[i][j]['tile']
                }
              }
            }
          }
        }
      }
    }

    // this.tiles is an array of the purchased tiles.
    let tilesArray = [];
    for(var tile in tiles) {
      var currentTile = tiles[tile];
      tilesArray.push(currentTile);
    }
    console.log(tilesArray);
    this.tiles = tilesArray;

    return tiles;
  }

  public getPurchasedVeloTiles(materialType: string) {
    let tilesArray = [];
    let veloTiles = this.tiles;
    for (let tile in veloTiles) {
      if(veloTiles[tile].materialType == materialType) {
        tilesArray.push(veloTiles[tile]);
      }
    }

    return tilesArray;
  }

  public getUserInputs() {
    return {
      "UserInputs": {
        "Type": this.getFeatureTypeInteger(),
        "NumX": this.getRows(),
        "NumY": this.getColumns(),
        "Tiles": this.feature_type == 'velo' ? this.veloTiles() : this.gridData
      }
    }
  }

  public convertCMtoIN(cm: number) {
    // 1 cm = 0.393701 in
    var conversion: number = 0.393701;
    var inches = cm * conversion;
    return Math.ceil(inches);
  }

  public convertINtoCM(inches: number) {
    // 1 cm = 0.393701 in
    var conversion: number = 2.54;
    var cm = inches * conversion;
    return Math.ceil(cm);
  }

  public veloTiles() {
    let veloTiles = [];
    for( var tile in this.gridData) {
      if(this.gridData[tile].texture != '') {
        veloTiles.push(this.gridData[tile]);
      }
    }
    return veloTiles;
  }

  public findVeloTileAt(x,y) {
    for (let el in this.gridData) {
      if(this.gridData[el].x == x && this.gridData[el].y == y) {
        return this.gridData[el];
      }
    }
  }

  public getVeloConnections(island: any): any [] {
    let veloTiles = [];
    let veloConnections: any;
    let variaToVariaCount: number = 0;
    let variaToFeltCount: number = 0;
    let feltToFeltCount: number = 0;
    let matches: any = [];

    for (let i in island) {
      veloTiles.push(this.gridData[island[i]]);
    }
    // loop through the tiles and count
    for (let i in veloTiles) {
      let thisMaterialType = veloTiles[i]['materialType'];
      for (let j in veloTiles[i].neighbors) {
        let neighbor = this.findVeloTileAt(veloTiles[i].neighbors[j][0],veloTiles[i].neighbors[j][1]);
        // determine if this seam has already been matched and therefore counted.
        let thisIndex = veloTiles[i].index;
        let neighborIndex = neighbor.index;
        let a = Math.min(thisIndex, neighborIndex);
        let b = Math.max(thisIndex, neighborIndex);
        let mappedIndex = (a + b) * (a + b + 1) / 2 + a;
        if(typeof neighbor.materialType != 'undefined' && !matches[mappedIndex]) {
          // felt to felt seams
          if(thisMaterialType == 'felt' && neighbor.materialType == 'felt') {
            feltToFeltCount++;
          }
          // felt to varia seams or varia to felt seams
          if(thisMaterialType == 'felt' && neighbor.materialType == 'varia') {
            variaToFeltCount++;
          }
          if(thisMaterialType == 'varia' && neighbor.materialType == 'felt') {
            variaToFeltCount++;
          }
          // varia to varia seams
          if(thisMaterialType == 'varia' && neighbor.materialType == 'varia') {
            variaToVariaCount++;
          }

          // add this mappedIndex to matches array
          matches[mappedIndex] = true;
        }
      }
    }

    veloConnections = {
      "variaToVaria": variaToVariaCount,
      "variaToFelt": variaToFeltCount,
      "feltToFelt": feltToFeltCount,
      "totalConnections": variaToVariaCount + variaToFeltCount + feltToFeltCount
    };
    return veloConnections;
  }

  public getIslands() {
    let islands: any = [];
    let indices = this.gridData.map(e => e.index);
    for (let i = 0; i < indices.length; i++) {
      let index = indices[i];
      let island = this._getIsland(+index);

      if (island.length <= 0) continue;

      indices = _.difference(indices, island);
      islands.push(island);
    }
    return islands;
  }

  private _getIsland(index: number, members: any = []): any [] {
    let tileObject = this.gridData[index];
    if(tileObject.texture === '') {
      return members;
    }

    if(!members.includes(index)) {
      members.push(index);
      for(let neighborIndex in tileObject.neighbors) {
        let neighbor = tileObject.neighbors[neighborIndex];
        let island = this._getIsland(this.findVeloTileAt(neighbor[0], neighbor[1]).index, members);
        for (let tile in island) {
          if(!members.includes(island[tile])) {
            members.push(island[tile]);
          }
        }
      }
    }

    return members;
  }

  public veloHasVaria() {
    let hasVaria = false;
    let veloTiles = this.veloTiles();
    for (let i in veloTiles) {
      if(!hasVaria && veloTiles[i].materialType == 'varia') {
        hasVaria = true;
      }
    }
    return hasVaria;
  }

  public veloHasFelt() {
    let hasFelt = false;
    let veloTiles = this.veloTiles();
    for (let i in veloTiles) {
      if(!hasFelt && veloTiles[i].materialType == 'felt') {
        hasFelt = true;
      }
    }
    return hasFelt;
  }

  public veloWidth() {
    let veloTiles = this.veloTiles();
    let calculatedWidth = 0;
    for (let i in veloTiles) {
      // we need to determine if the tile actually adds width or not...
      calculatedWidth += veloTiles[i].width;
    }

    return calculatedWidth;
  }

  public veloLength() {
    let veloTiles = this.veloTiles();
    let calculatedHeight = 0;
    for (let i in veloTiles) {
      // we need to determine if the tile actually adds height or not...
      calculatedHeight += veloTiles[i].height;
    }

    return calculatedHeight;
  }

  public packageInformation() {
    let info: string = "";
    if(this.feature_type == "tetria") {
      info = "Tiles are sold in quanties of 4.";
    }

    if(this.feature_type == "clario" && this.tile_size == 24) {
      info = "Baffles are sold in quantities of 4.";
    }

    if(this.feature_type == "clario" && this.tile_size == 48) {
      info = "24x24 baffles are sold in qty of 4, and 24x48 baffles are sold in qty of 2.";
    }

    if(this.feature_type == "velo") {
      info = "Velo tiles are sold in quanties of 8.";
    }

    return info;
  }

  public updateGridUnits(units: string) {
    if ( this.feature_type == 'velo' ) {
      if(units == 'centimeters' && this.units != units ) {
        // convert measurements to cm
        this.width = 976;
        this.length = 610;
      }else if(units == 'inches' && this.units != units) {
        // convert measurement to inches
        this.width = 384;
        this.length = 240;
      }
    }
    // update the units.
    this.units = units;
  }
}
