import { WeierstrassPoint } from "../src/babyJubjub";
import {
  computeTUFromR,
  privateKeyToPublicKey,
  recoverPubKeyIndexFromSignature,
  verifyEcdsaSignature,
} from "../src/ecdsa";
import { hexToBigInt, publicKeyFromString } from "../src/utils";

// Note for all ecdsa tests: the magic expected values are generated from
// a Python implementation of BabyJubjub ECDSA: https://github.com/AndrewCLu/baby-jubjub
// This implementation itself is based on many different EC and ECDSA formulae around the web
// Tests BabyJubjub ECDSA signature verification in Javascript
describe("javascript signature verification", () => {
  test("should verify a baby jubjub ecdsa signature 0", () => {
    const privKey =
      "0323dbbda9a5aff570d974d71c88334cf99ab9c0455e1d2546ca03ca069eb1e0";
    const msgHash = BigInt("0");
    const sig = {
      r: hexToBigInt(
        "00EF7145470CEC0B683C629CBA8ED58110000FFE657366F7D5A91F2D149DD8B5"
      ),
      s: hexToBigInt(
        "0370C60A23266F520C56DA088B4C4AFAAAF6BB1993A501980F6D8FB6F343984A"
      ),
    };

    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    expect(verifyEcdsaSignature(sig, msgHash, pubKey)).toBe(true);
  });

  test("should verify a baby jubjub ecdsa signature 1", () => {
    const privKey =
      "0323dbbda9a5aff570d974d71c88334cf99ab9c0455e1d2546ca03ca069eb1e0";
    const msgHash = BigInt("1");
    const sig = {
      r: hexToBigInt(
        "04BEF5B82A7637BBFF0D3C52DDB982A00C84FE8A386625369B511CF538CD3584"
      ),
      s: hexToBigInt(
        "00CA8ED01E70CEC6DE27C1B9F6735B52FB49E4521F50BEEDEED8E81459729E2E"
      ),
    };

    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    expect(verifyEcdsaSignature(sig, msgHash, pubKey)).toBe(true);
  });

  test("should verify a baby jubjub ecdsa signature 2", () => {
    const privKey =
      "0323dbbda9a5aff570d974d71c88334cf99ab9c0455e1d2546ca03ca069eb1e0";
    const msgHash = BigInt("2");
    const sig = {
      r: hexToBigInt(
        "05718D88F4B6B357D2D9D53708F1C3EFE61C38C6A8BD107B2779182D80E75665"
      ),
      s: hexToBigInt(
        "00906FA5864D2682981DA3B5BABBB5C3EA07E008335ED8266C55546D46B45A42"
      ),
    };

    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    expect(verifyEcdsaSignature(sig, msgHash, pubKey)).toBe(true);
  });

  test("should verify a baby jubjub ecdsa signature 3", () => {
    const pubKey = new WeierstrassPoint(
      BigInt(
        "3232533026113810378959142444695349421501562423203727069041340448447821565406"
      ),
      BigInt(
        "2188348859066493967748283765357824083446977800414462976475976389468050954576"
      )
    );
    const msgHash = BigInt(
      "2946972996217835208449517111206100981106410880664713281589395314649921690550"
    );
    const sig = {
      r: BigInt(
        "1840783889620414587148889492823509056116889771324083520524283336613943085117"
      ),
      s: BigInt(
        "1739665441663252318720166579941834138245075960720774698623992586667777500452"
      ),
    };

    expect(verifyEcdsaSignature(sig, msgHash, pubKey)).toBe(true);
  });

  test("should verify a baby jubjub ecdsa signature 4", () => {
    const pubKey = new WeierstrassPoint(
      BigInt(
        "3232533026113810378959142444695349421501562423203727069041340448447821565406"
      ),
      BigInt(
        "2188348859066493967748283765357824083446977800414462976475976389468050954576"
      )
    );
    const msgHash = BigInt(
      "959992042565662302991225573197761987736081061736836521396002216380900360528"
    );
    const sig = {
      r: BigInt(
        "1856322010174419002598766346323954612142211502777436374084285602917776883052"
      ),
      s: BigInt(
        "620220295126728043540210170239716626150792206560166734872758425758290398102"
      ),
    };

    expect(verifyEcdsaSignature(sig, msgHash, pubKey)).toBe(true);
  });
});

// Tests BabyJubjub ECDSA public key recovery in Javascript
describe("ecdsa public key recovery", () => {
  it("should recover the correct public key index", () => {
    const pubKeys = [
      "041941f5abe4f903af965d707182b688bd1fa725fd2cbc648fc435feb42a3794593275a2e9b4ad4bc0d2f3ecc8d23e3cf89da889d7aa35ce33f132d87b5bb5c393",
      "049ae9f2ec6a4db43f0e081a436f885b0d3f5753a45b00d2f2e3da38956848c4ff0205d89e14a2e36976bfe033407dbce6b48261d84d201277de0c3b82f08ddb09",
      "041052d6da0c3d7248e39e08912e2daa53c4e54cd9f2d96e3702fa15e77b199a501cd835bbddcc77134dc59dbbde2aa702183a68c90877906a31536eef972fac36",
      "044d9d03f3266f24777ac488f04ec579e1c4bea984398c9b98d99a9e31bc75ef0f13a19471a7297a6f2bf0126ed93d4c55b6e98ec286203e3d761c61922e3a4cda",
    ];
    const msgHash = BigInt("0");
    const sig = {
      r: hexToBigInt(
        "00EF7145470CEC0B683C629CBA8ED58110000FFE657366F7D5A91F2D149DD8B5"
      ),
      s: hexToBigInt(
        "0370C60A23266F520C56DA088B4C4AFAAAF6BB1993A501980F6D8FB6F343984A"
      ),
    };

    const pubKeyPoints = pubKeys.map((pubKey) => publicKeyFromString(pubKey));

    const recoveredIndex = recoverPubKeyIndexFromSignature(
      sig,
      msgHash,
      pubKeyPoints
    );

    const expectedIndex = 2;

    expect(recoveredIndex).toEqual(expectedIndex);
  });

  it("should error if the public key is not in the list", () => {
    const pubKeys = [
      "041941f5abe4f903af965d707182b688bd1fa725fd2cbc648fc435feb42a3794593275a2e9b4ad4bc0d2f3ecc8d23e3cf89da889d7aa35ce33f132d87b5bb5c393",
      "049ae9f2ec6a4db43f0e081a436f885b0d3f5753a45b00d2f2e3da38956848c4ff0205d89e14a2e36976bfe033407dbce6b48261d84d201277de0c3b82f08ddb09",
      "044d9d03f3266f24777ac488f04ec579e1c4bea984398c9b98d99a9e31bc75ef0f13a19471a7297a6f2bf0126ed93d4c55b6e98ec286203e3d761c61922e3a4cda",
      "044d9d03f3266f24777ac488f04ec579e1c4bea984398c9b98d99a9e31bc75ef0f13a19471a7297a6f2bf0126ed93d4c55b6e98ec286203e3d761c61922e3a4cda",
    ];
    const msgHash = BigInt("0");
    const sig = {
      r: hexToBigInt(
        "00EF7145470CEC0B683C629CBA8ED58110000FFE657366F7D5A91F2D149DD8B5"
      ),
      s: hexToBigInt(
        "0370C60A23266F520C56DA088B4C4AFAAAF6BB1993A501980F6D8FB6F343984A"
      ),
    };

    const pubKeyPoints = pubKeys.map((pubKey) => publicKeyFromString(pubKey));

    expect(() =>
      recoverPubKeyIndexFromSignature(sig, msgHash, pubKeyPoints)
    ).toThrow();
  });

  it("should error if public key is not recoverable", () => {
    const pubKeys = [
      "041941f5abe4f903af965d707182b688bd1fa725fd2cbc648fc435feb42a3794593275a2e9b4ad4bc0d2f3ecc8d23e3cf89da889d7aa35ce33f132d87b5bb5c393",
      "049ae9f2ec6a4db43f0e081a436f885b0d3f5753a45b00d2f2e3da38956848c4ff0205d89e14a2e36976bfe033407dbce6b48261d84d201277de0c3b82f08ddb09",
      "041052d6da0c3d7248e39e08912e2daa53c4e54cd9f2d96e3702fa15e77b199a501cd835bbddcc77134dc59dbbde2aa702183a68c90877906a31536eef972fac36",
      "044d9d03f3266f24777ac488f04ec579e1c4bea984398c9b98d99a9e31bc75ef0f13a19471a7297a6f2bf0126ed93d4c55b6e98ec286203e3d761c61922e3a4cda",
    ];
    const msgHash = BigInt("0");
    const sig = {
      r: hexToBigInt(
        "00EF7145470CEC0B683C629CBA8ED58110000FFE657366F7D5A91F2D149DD8B4"
      ),
      s: hexToBigInt(
        "0370C60A23266F520C56DA088B4C4AFAAAF6BB1993A501980F6D8FB6F343984A"
      ),
    };

    const pubKeyPoints = pubKeys.map((pubKey) => publicKeyFromString(pubKey));

    expect(() =>
      recoverPubKeyIndexFromSignature(sig, msgHash, pubKeyPoints)
    ).toThrow();
  });
});

// Tests conversion between ECDSA private keys and public keys
describe("private to public key conversion", () => {
  test("should convert a private key to a public key 0", () => {
    const privKey =
      "0323dbbda9a5aff570d974d71c88334cf99ab9c0455e1d2546ca03ca069eb1e0";
    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    const expectedPubKey = new WeierstrassPoint(
      BigInt(
        "7383369888919701441480368741745717804236448589785295824485316386504973064784"
      ),
      BigInt(
        "13046769583748125084667126323794391074141340611556711664428099286902963678262"
      )
    );

    expect(pubKey).toEqual(expectedPubKey);
  });

  test("should convert a private key to a public key 1", () => {
    const privKey =
      "04b81e7180cd9504ce1bf0f728b4c828ad369781986aff07284d60ec1d59850b";
    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    const expectedPubKey = new WeierstrassPoint(
      BigInt(
        "8022836036792728510020073593790625374591718668941094754729876067757770684825"
      ),
      BigInt(
        "2888043282838146526405156459340757249954671046314727413645487686643973993965"
      )
    );

    expect(pubKey).toEqual(expectedPubKey);
  });

  test("should convert a private key to a public key 2", () => {
    const privKey =
      "02ea6ba4d6ec9b1b724f93a5ddf4ddcc94fc09909753088c272970fe3c99c4d8";
    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    const expectedPubKey = new WeierstrassPoint(
      BigInt(
        "9714024128310316092057230443118059995407288196097449837364797009977227758081"
      ),
      BigInt(
        "3986000760809817233522229217388333078261970153215912556094459527204210942908"
      )
    );

    expect(pubKey).toEqual(expectedPubKey);
  });

  test("should convert a private key to a public key 3", () => {
    const privKey =
      "0323dbbda9a5aff570d974d71c88334cf99ab9c0455e1d2546ca03ca069eb1e0";
    const pubKey = privateKeyToPublicKey(hexToBigInt(privKey));

    const expectedPubKey = new WeierstrassPoint(
      BigInt(
        "7383369888919701441480368741745717804236448589785295824485316386504973064784"
      ),
      BigInt(
        "13046769583748125084667126323794391074141340611556711664428099286902963678262"
      )
    );

    expect(pubKey).toEqual(expectedPubKey);
  });
});

// These examples are taken from the BabyJubjub ECDSA Python implementation
describe("efficient ecdsa utils", () => {
  test("should convert R and a message hash to T and U correctly", () => {
    const R = new WeierstrassPoint(
      BigInt(
        "10670285876735019599106866976684908952274911389930362762537090111564921097016"
      ),
      BigInt(
        "9160051989315312112039929478094450530265103887834999493414216896339841057063"
      )
    );
    const msgHash = BigInt("2");

    const expectedT = new WeierstrassPoint(
      BigInt(
        "6952765017569839958343264710546584578753992328892854973252223160184157850745"
      ),
      BigInt(
        "9563206295407598382073804946882877811714977803488938527800721542415224962428"
      )
    );
    const expectedU = new WeierstrassPoint(
      BigInt(
        "12614432555643728606782560810226874354451117249983040637892389649426582274947"
      ),
      BigInt(
        "13906431017424053199814642411232056924432788712909729385753697397225312690892"
      )
    );

    const { T, U } = computeTUFromR(R.toEdwards(), msgHash);

    expect(T.toWeierstrass().equals(expectedT)).toBe(true);
    expect(U.toWeierstrass().equals(expectedU)).toBe(true);
  });
});
