import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface NoticeBoard {
    reqId: string;
    bizCLS: string;
    idpType: string;
    fileName: string;
    filePath: string;
    page: number,
    status: string;
    startDateTime: string;
    endDateTime: string;
}

interface searchPayload {
    id: string,
    keyword: string
}

const initialState: NoticeBoard[] = [
        {reqId:"01KC3CFHYQNXRTR0VAQC0NT7AS",bizCLS:"Glennie",idpType:"ur",fileName:"IpsumDolor.avi",filePath:"0x2fe70d3e7bf5270928326fafec8a8b03b9537013",page:64,status:"3XL",startDateTime:"2025-01-03",endDateTime:"2025-08-01"},
        {reqId:"01KC3CFHZHZVJGCTT3ESTPBGZ0",bizCLS:"Colas",idpType:"br",fileName:"LoremVitaeMattis.tiff",filePath:"0xbb355027d1e3d5376882484d3854609501bb05af",page:38,status:"3XL",startDateTime:"2025-05-22",endDateTime:"2025-07-19"},
        {reqId:"01KC3CFHZKEFZKG16RJQC7QYZ9",bizCLS:"Fair",idpType:"lb",fileName:"In.avi",filePath:"0x9a0bba6d0321c053196164fce48b571dabbe6fc6",page:100,status:"XS",startDateTime:"2025-04-03",endDateTime:"2025-10-07"},
        {reqId:"01KC3CFHZMWP2WXNH8BZKSY8MY",bizCLS:"Colline",idpType:"da",fileName:"IpsumIntegerA.doc",filePath:"0xe080817fd2fa6801d8a043771dab229dd7243f7d",page:40,status:"XS",startDateTime:"2025-04-08",endDateTime:"2025-11-02"},
        {reqId:"01KC3CFHZNX0KZKA9YKSYS6ZH0",bizCLS:"Bernardine",idpType:"jv",fileName:"OdioJustoSollicitudin.ppt",filePath:"0x40d190b2e97ceb04691a2b2b15fc2f0922cb2fc1",page:2,status:"2XL",startDateTime:"2025-01-17",endDateTime:"2025-11-08"},
        {reqId:"01KC3CFHZP401YH5XZWZ89ZH7C",bizCLS:"Jenny",idpType:"lu",fileName:"PrimisIn.avi",filePath:"0x60210f36062c34c8829b39d1cd8ab64c4a406be3",page:95,status:"S",startDateTime:"2025-03-12",endDateTime:"2025-08-12"},
        {reqId:"01KC3CFHZQ97EKJ9GDEH8X0CTG",bizCLS:"Channa",idpType:"ur",fileName:"Hac.ppt",filePath:"0xc27ed397b49f26082d3560e057fa17a8a11197c3",page:95,status:"2XL",startDateTime:"2025-05-07",endDateTime:"2025-09-09"},
        {reqId:"01KC3CFHZR592N9EY8YXG6JJA5",bizCLS:"Dugald",idpType:"ho",fileName:"Vestibulum.mov",filePath:"0x70b3550c0de5ea7dcec88a84bed93238692e458d",page:11,status:"S",startDateTime:"2025-06-11",endDateTime:"2025-11-14"},
        {reqId:"01KC3CFHZS6YJME6C046HQPRDR",bizCLS:"Steve",idpType:"sv",fileName:"AtVulputateVitae.txt",filePath:"0xff072eec38aeeff20cee5457e9300abfd35efe1f",page:40,status:"XS",startDateTime:"2025-01-07",endDateTime:"2025-09-04"},
        {reqId:"01KC3CFHZTKAH5857YCEC1A5HZ",bizCLS:"Godart",idpType:"mr",fileName:"LaciniaAenean.tiff",filePath:"0xccbd9e06ee360cba8b4a5091da068561b1bfc0c8",page:69,status:"L",startDateTime:"2025-02-19",endDateTime:"2025-10-11"},
        {reqId:"01KC3CFHZV6FJST1X0JVBXR55Y",bizCLS:"Clayborn",idpType:"io",fileName:"CrasNonVelit.avi",filePath:"0x346cfd467f1f27e2012c6e423410355d465a626b",page:3,status:"M",startDateTime:"2025-06-14",endDateTime:"2025-08-29"},
        {reqId:"01KC3CFHZW392KHVC3FB4RT3JN",bizCLS:"Maurene",idpType:"ky",fileName:"In.avi",filePath:"0x74bf68f1316d7b72e536fa04691746b81592dddc",page:17,status:"2XL",startDateTime:"2025-01-16",endDateTime:"2025-11-08"},
        {reqId:"01KC3CFHZYBZ6ZRMFNG0PQGRKE",bizCLS:"Maurise",idpType:"mh",fileName:"Turpis.png",filePath:"0xe113ceaf1c5c132fc0244100db7f167b1012f609",page:48,status:"XL",startDateTime:"2025-02-10",endDateTime:"2025-11-11"},
        {reqId:"01KC3CFHZZ233BZJ8D5JR6K3TH",bizCLS:"Napoleon",idpType:"hz",fileName:"VelAccumsanTellus.ppt",filePath:"0xe42885f31d95356f4f95c94e47fc7c5b2e339dbb",page:14,status:"L",startDateTime:"2025-06-24",endDateTime:"2025-08-31"},
        {reqId:"01KC3CFJ00V5AHKF0VJKWJN45B",bizCLS:"Dru",idpType:"nl",fileName:"Morbi.ppt",filePath:"0x635ac92df04e2d3893b73e3fda4e6ccc6cfccdcc",page:77,status:"S",startDateTime:"2025-06-10",endDateTime:"2025-10-26"},
        {reqId:"01KC3CFJ018V13Q5GFVYY6VQYC",bizCLS:"Val",idpType:"rm",fileName:"AugueVestibulumRutrum.jpeg",filePath:"0xc03bb149f9b3ccb083df45b441603c417c39b228",page:73,status:"S",startDateTime:"2025-05-29",endDateTime:"2025-09-16"},
        {reqId:"01KC3CFJ02Z8NCR9052136HHKS",bizCLS:"Lorrin",idpType:"mh",fileName:"HacHabitassePlatea.tiff",filePath:"0x50984a4b854bdc60f34b8b258e8264d1ae49e985",page:11,status:"3XL",startDateTime:"2025-04-10",endDateTime:"2025-07-15"},
        {reqId:"01KC3CFJ03TE07M6HAF8QKGKR0",bizCLS:"Erminia",idpType:"kv",fileName:"Quisque.gif",filePath:"0xd3fcfa2139db7302b478a537fbfbc0a3cb136f66",page:12,status:"M",startDateTime:"2025-03-29",endDateTime:"2025-11-14"},
        {reqId:"01KC3CFJ04ZR46DY7NM4AB84WZ",bizCLS:"Tarra",idpType:"eu",fileName:"DuisAliquamConvallis.mp3",filePath:"0x5f2ce0bc81e1021962a2dec0bc4e8c786a4fede5",page:25,status:"XS",startDateTime:"2025-05-02",endDateTime:"2025-10-29"},
        {reqId:"01KC3CFJ05V1ZK16880A01309D",bizCLS:"Alleen",idpType:"os",fileName:"MiSitAmet.mp3",filePath:"0xae4471bf68769654be5e6e3d60117d525e777334",page:42,status:"XL",startDateTime:"2025-02-18",endDateTime:"2025-09-23"},
        {reqId:"01KC3CFJ06MH2XPNX2MCZ7BX1Z",bizCLS:"Matelda",idpType:"ts",fileName:"Quisque.tiff",filePath:"0xd0be5649be5ed13dc2e836b85b0baf9e2b1f0ef8",page:47,status:"XS",startDateTime:"2025-04-14",endDateTime:"2025-09-10"},
        {reqId:"01KC3CFJ07DHV2H2BBXVB3EMMW",bizCLS:"Patty",idpType:"ve",fileName:"Leo.gif",filePath:"0xe2d9483a789c9504cfd9ed31b2ac14053d3de3d7",page:5,status:"XL",startDateTime:"2025-02-11",endDateTime:"2025-07-02"},
        {reqId:"01KC3CFJ08XDFA04V5EPCBDM7G",bizCLS:"Victoir",idpType:"am",fileName:"SemPraesentId.xls",filePath:"0x9ece26e2ecadda36fd6243261c866857950bceaf",page:88,status:"3XL",startDateTime:"2025-06-28",endDateTime:"2025-08-31"},
        {reqId:"01KC3CFJ0A1MGYPH3EZFPPP6Z1",bizCLS:"Annemarie",idpType:"bm",fileName:"Rhoncus.mp3",filePath:"0x3805e71397e4382db13a2ac3e282e2fe99903492",page:18,status:"M",startDateTime:"2025-04-07",endDateTime:"2025-10-29"},
        {reqId:"01KC3CFJ0BGZV3DTJM5ZXZNKQK",bizCLS:"Osgood",idpType:"ru",fileName:"Dolor.ppt",filePath:"0x5f3a951fa6a40bfea2a1d7b20e9f7b93eb79830f",page:8,status:"2XL",startDateTime:"2025-05-17",endDateTime:"2025-07-11"},
        {reqId:"01KC3CFJ0C463K9FTGRFTWGPTY",bizCLS:"Petronilla",idpType:"tr",fileName:"AeneanAuctorGravida.jpeg",filePath:"0xba87f03ee32a734729f6be9f5ff022d8c3d027ce",page:78,status:"2XL",startDateTime:"2025-03-25",endDateTime:"2025-11-14"},
        {reqId:"01KC3CFJ0DDVZ9GWFM0QVQ9SGT",bizCLS:"Melisenda",idpType:"nd",fileName:"VelitDonecDiam.pdf",filePath:"0x926e88603d240fbba9770cfe63990a7ee8f40b0a",page:56,status:"L",startDateTime:"2025-01-04",endDateTime:"2025-10-25"},
        {reqId:"01KC3CFJ0E9B64DKJ682V6949V",bizCLS:"Nickola",idpType:"ha",fileName:"LacusPurusAliquet.mp3",filePath:"0x081db38a000150286e216e1a46d13bf5d94078ab",page:24,status:"3XL",startDateTime:"2025-02-22",endDateTime:"2025-09-20"},
        {reqId:"01KC3CFJ0FZFPA7JP2SWQ60G3K",bizCLS:"Everard",idpType:"sc",fileName:"LectusIn.tiff",filePath:"0xa97b21d7a2a3d74a257cfd3068b4ccde351eb4f7",page:98,status:"XS",startDateTime:"2025-05-20",endDateTime:"2025-07-27"},
        {reqId:"01KC3CFJ0G8BP5KAHNRXW9CMV0",bizCLS:"Siana",idpType:"ca",fileName:"Eu.gif",filePath:"0xdf9d47eed685db42818abedb95dc91bc057e6ad2",page:54,status:"S",startDateTime:"2025-02-06",endDateTime:"2025-09-12"},
        {reqId:"01KC3CFJ0H18NXV7QMB5XFF5D0",bizCLS:"Kory",idpType:"mi",fileName:"QuisLibero.jpeg",filePath:"0x800c68320d03d3afa2a2cf80e61e08941bbdb483",page:29,status:"M",startDateTime:"2025-06-21",endDateTime:"2025-10-20"},
        {reqId:"01KC3CFJ0JHY35ZV0P7H9FD65K",bizCLS:"Tamarra",idpType:"hu",fileName:"NisiVenenatisTristique.xls",filePath:"0xcc15ca396b6110fe7657671625e797c53bef75b6",page:15,status:"L",startDateTime:"2025-02-17",endDateTime:"2025-11-05"},
        {reqId:"01KC3CFJ0KA68BBPSAZ891VKFR",bizCLS:"Trenton",idpType:"ja",fileName:"Nunc.mov",filePath:"0x11b25b205086368a2cafb482a009b0a4e22af17f",page:33,status:"S",startDateTime:"2025-02-27",endDateTime:"2025-10-23"},
        {reqId:"01KC3CFJ0ME3BJQNK7PFCCTY9V",bizCLS:"Jerrie",idpType:"eo",fileName:"QuisqueIdJusto.txt",filePath:"0xfc09cd95ea2c9cf91fb7f87311e7855b867d8c3f",page:87,status:"2XL",startDateTime:"2025-01-20",endDateTime:"2025-09-27"},
        {reqId:"01KC3CFJ0NEKZ0B206E71YDPY5",bizCLS:"Doy",idpType:"uz",fileName:"OrciMauris.avi",filePath:"0x6a487a45a89692518d82533e7435951b1e558a6b",page:64,status:"L",startDateTime:"2025-05-03",endDateTime:"2025-07-31"},
        {reqId:"01KC3CFJ0P0GX7X47BD1WTC9ST",bizCLS:"Amelie",idpType:"bi",fileName:"SedNislNunc.avi",filePath:"0x62ef2e616bd1d047ad3a57c511f03d9dd886e374",page:26,status:"XS",startDateTime:"2025-02-19",endDateTime:"2025-10-18"},
        {reqId:"01KC3CFJ0QZGPNE4HM2RHVA4HH",bizCLS:"Frieda",idpType:"sd",fileName:"Diam.mp3",filePath:"0xd7e6b947a6c2060067480f188a4081c6d4c0fc44",page:19,status:"3XL",startDateTime:"2025-04-27",endDateTime:"2025-10-22"},
        {reqId:"01KC3CFJ0RECSCF3YJ9D4S570M",bizCLS:"Maitilde",idpType:"ne",fileName:"LectusPellentesque.tiff",filePath:"0x9904edc67d67d9083b1db15b2954d1e388e397ac",page:17,status:"XS",startDateTime:"2025-02-11",endDateTime:"2025-08-27"},
        {reqId:"01KC3CFJ0SF1SAJ21EAW3J5663",bizCLS:"Artur",idpType:"eu",fileName:"BlanditUltricesEnim.xls",filePath:"0x84d1291a64684e31d0c1cc83376805e5a41ad82a",page:99,status:"XS",startDateTime:"2025-05-24",endDateTime:"2025-07-23"},
        {reqId:"01KC3CFJ0TT2YC4970H0W2ATZV",bizCLS:"Beniamino",idpType:"nr",fileName:"Morbi.xls",filePath:"0x364dd5618cc55d60e48d400484de054c0947daee",page:15,status:"XL",startDateTime:"2025-03-07",endDateTime:"2025-07-23"},
        {reqId:"01KC3CFJ0VRNJN1A80KHB4DSPJ",bizCLS:"Waiter",idpType:"br",fileName:"In.xls",filePath:"0x91151b04ad0d2f26fb7965ab7f1d4b0edf687eda",page:18,status:"S",startDateTime:"2025-02-02",endDateTime:"2025-09-22"},
        {reqId:"01KC3CFJ0WMCJ3PBXZX6RMW5AP",bizCLS:"Winnie",idpType:"ae",fileName:"EgestasMetusAenean.png",filePath:"0x558d51252de35b2fc57f6e1fc71f9b9bc67838d7",page:61,status:"3XL",startDateTime:"2025-05-31",endDateTime:"2025-07-10"},
        {reqId:"01KC3CFJ0Y3T34BTSDM8H3A9HT",bizCLS:"Jannel",idpType:"dz",fileName:"TinciduntEu.ppt",filePath:"0xcfada1f86f037747c4480ca87962ba2874a510cf",page:33,status:"S",startDateTime:"2025-06-01",endDateTime:"2025-11-29"},
        {reqId:"01KC3CFJ0ZPHP0J0AKFJ3J35KP",bizCLS:"Ulrica",idpType:"ff",fileName:"TurpisEnim.avi",filePath:"0x8fca3364d270d75148c700b7fc6bfb1aaf32a357",page:51,status:"3XL",startDateTime:"2025-06-11",endDateTime:"2025-10-13"},
        {reqId:"01KC3CFJ10Y7KPQ8SKWYD8CZT3",bizCLS:"Therine",idpType:"bo",fileName:"UtMauris.xls",filePath:"0xd094cc0365c7834eacce5239e52e66cdf60f171b",page:48,status:"3XL",startDateTime:"2025-03-08",endDateTime:"2025-10-19"},
        {reqId:"01KC3CFJ11418DTG91V5GFF6MX",bizCLS:"Aprilette",idpType:"vo",fileName:"TurpisDonec.png",filePath:"0xadb57e7941cfa4f56170a746741d04ac91b729d3",page:62,status:"XS",startDateTime:"2025-05-19",endDateTime:"2025-08-04"},
        {reqId:"01KC3CFJ12NCVYV7FRCZG0V96M",bizCLS:"Carroll",idpType:"fy",fileName:"FelisFusce.ppt",filePath:"0x572bbbdf58cfe310fc59749837fbf9359bd79040",page:18,status:"M",startDateTime:"2025-05-18",endDateTime:"2025-10-25"},
        {reqId:"01KC3CFJ13QKP70YHEZNRERYCH",bizCLS:"Bunni",idpType:"mh",fileName:"EgetVulputateUt.tiff",filePath:"0x11a4a68e454676e42f271f06186c152174d0320e",page:2,status:"XS",startDateTime:"2025-03-18",endDateTime:"2025-08-05"},
        {reqId:"01KC3CFJ14RQNSYV24SB15YH6Z",bizCLS:"Keriann",idpType:"ln",fileName:"Auctor.ppt",filePath:"0x809ab42c9fc1a999f7724d917609241d2e75c0d7",page:39,status:"3XL",startDateTime:"2025-01-29",endDateTime:"2025-11-12"},
        {reqId:"01KC3CFJ15EZJSX7F6EVCC6A9T",bizCLS:"De",idpType:"wo",fileName:"Quis.txt",filePath:"0x702992cf48582488f0629f456b6c8728c83efdd4",page:13,status:"S",startDateTime:"2025-02-01",endDateTime:"2025-07-15"}
];

const noticeBoardSlice = createSlice({
    name : 'talbeRow',
    initialState : initialState,
    reducers : {
        changeTableRow(state, action) {
            return state = action.payload;
        },
        initialTableRow(state){
            return state = initialState;
        },
        filterTableRow(state, action: PayloadAction<searchPayload>){
            const { id, keyword } = action.payload;
            
            if(id === "reqId")
                return state = state.filter((item: any) => (item.reqId).includes(keyword));
            else if(id === "status")
                return state = state.filter((item: any) => item.status === keyword);  
        }

    }
})

export const { changeTableRow, initialTableRow, filterTableRow } = noticeBoardSlice.actions;

export default noticeBoardSlice.reducer;