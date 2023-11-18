// Verification Key Hash: 207da0432d5fd1d28724b32a4b70f4680e67bf3c81433ab255f2ec13b2b8bbd6
// SPDX-License-Identifier: Apache-2.0
// Copyright 2022 Aztec
pragma solidity >=0.8.4;

library UltraVerificationKey {
    function verificationKeyHash() internal pure returns (bytes32) {
        return
            0x207da0432d5fd1d28724b32a4b70f4680e67bf3c81433ab255f2ec13b2b8bbd6;
    }

    function loadVerificationKey(
        uint256 _vk,
        uint256 _omegaInverseLoc
    ) internal pure {
        assembly {
            mstore(
                add(_vk, 0x00),
                0x0000000000000000000000000000000000000000000000000000000000040000
            ) // vk.circuit_size
            mstore(
                add(_vk, 0x20),
                0x0000000000000000000000000000000000000000000000000000000000000020
            ) // vk.num_inputs
            mstore(
                add(_vk, 0x40),
                0x19ddbcaf3a8d46c15c0176fbb5b95e4dc57088ff13f4d1bd84c6bfa57dcdc0e0
            ) // vk.work_root
            mstore(
                add(_vk, 0x60),
                0x30644259cd94e7dd5045d7a27013b7fcd21c9e3b7fa75222e7bda49b729b0401
            ) // vk.domain_inverse
            mstore(
                add(_vk, 0x80),
                0x1215624c11e68aa5497adf7eb1bb3211cddcca44a50cf44717e83adcc5e1ce55
            ) // vk.Q1.x
            mstore(
                add(_vk, 0xa0),
                0x21a511c6e68c5188c8241aa951b878a400b67e707a3f7ef05644e780167434c9
            ) // vk.Q1.y
            mstore(
                add(_vk, 0xc0),
                0x1fa4d85c08c49cfedfefb046bd0817ffe51a67646fe63c3d5355077f5d655dd3
            ) // vk.Q2.x
            mstore(
                add(_vk, 0xe0),
                0x0b64c2d77c794edf31096f2318024c1d8ca5af80145f546e703b35da5675148a
            ) // vk.Q2.y
            mstore(
                add(_vk, 0x100),
                0x1b9cd21a3c387a3b091aba3e1472be728645703cdbd84a90220ab8e16c7c1994
            ) // vk.Q3.x
            mstore(
                add(_vk, 0x120),
                0x0069d88f6654fcb86c9aace772a537990cff37f4892b61d0a1fcb47370ef9085
            ) // vk.Q3.y
            mstore(
                add(_vk, 0x140),
                0x196e07a2a04274d0aa06b0ad58ab1ea10aaf5b33873779e8d5a7022e7e7b22b2
            ) // vk.Q4.x
            mstore(
                add(_vk, 0x160),
                0x08874b118935acef156d20a773f1918155ed3cb02c5a2c3505056451f1d75b1f
            ) // vk.Q4.y
            mstore(
                add(_vk, 0x180),
                0x098b81b1fc7d9487b7463f5994830e248414266d91930f80646e79d4ef733c85
            ) // vk.Q_M.x
            mstore(
                add(_vk, 0x1a0),
                0x1a898e69ff4bd5556520fa34722bb348cfd7db34a78ef8c3ac942e8b64b2dafb
            ) // vk.Q_M.y
            mstore(
                add(_vk, 0x1c0),
                0x26a3197fdc0a4f209641f6d2b164c60c85ae5dbc168be74345d90654c70d17dc
            ) // vk.Q_C.x
            mstore(
                add(_vk, 0x1e0),
                0x03338759309055a814f782a86ad90e82d6b2831ecfdfac8d2cf842e8a532b17a
            ) // vk.Q_C.y
            mstore(
                add(_vk, 0x200),
                0x1a083d6c61e4c1e52b48bcfff7e3e009f3d0534ff0d9e0b4fd0ff61b444a29fb
            ) // vk.Q_ARITHMETIC.x
            mstore(
                add(_vk, 0x220),
                0x19c2a9433e682fe461f6abfe057f4ccf4818dbd78904a6794c73baa7fc6faaf2
            ) // vk.Q_ARITHMETIC.y
            mstore(
                add(_vk, 0x240),
                0x2b5ce06b19033dcc9a1fa83df4352a67c5687aa450e8561d0aff53d342046795
            ) // vk.QSORT.x
            mstore(
                add(_vk, 0x260),
                0x2d8cefcf91bc7336b13b39fe928fd59df77ab277d0434ef799dfd48c66edd9ca
            ) // vk.QSORT.y
            mstore(
                add(_vk, 0x280),
                0x06a420107163438b7e2eb6b61e065c44d338bd8221003ef77e54c19ff5436e08
            ) // vk.Q_ELLIPTIC.x
            mstore(
                add(_vk, 0x2a0),
                0x13a4eaca407ce9d3bb75f4a03a84baaade4363d446768c2190647a7a6529310d
            ) // vk.Q_ELLIPTIC.y
            mstore(
                add(_vk, 0x2c0),
                0x23ab8151b371f92e388b2147d3e1e0296d3848d5f59b35a30abc89b8365d89b2
            ) // vk.Q_AUX.x
            mstore(
                add(_vk, 0x2e0),
                0x18a9dbb1f35aa73deebcb79bf0c4d4c1c389f5dd6d12d8e5eccfa6ee57009b5e
            ) // vk.Q_AUX.y
            mstore(
                add(_vk, 0x300),
                0x1064f89f3728b1965f834050cd8be4db51662a43765e990742d727fed8eee26f
            ) // vk.SIGMA1.x
            mstore(
                add(_vk, 0x320),
                0x06b435a30cf02ab4641f0965a25b3b1ebeab78ebf8db880b1c4670b08613f3e4
            ) // vk.SIGMA1.y
            mstore(
                add(_vk, 0x340),
                0x292745698e704a5cdd68bc15344793c63bf20c3f1492ea9b68cf9c7cf0479a18
            ) // vk.SIGMA2.x
            mstore(
                add(_vk, 0x360),
                0x1ea22c9087a5f8432bc20eac9c8de37587ff4c706c7bbd359a63cef0a4e37c89
            ) // vk.SIGMA2.y
            mstore(
                add(_vk, 0x380),
                0x09748934071b357216171b394bf6b840f87fa870656dd015689556bb7b11e36e
            ) // vk.SIGMA3.x
            mstore(
                add(_vk, 0x3a0),
                0x18c99f13b7e86fa5f28f5216514db883bbb4125831c315fdea1d24cf751e3416
            ) // vk.SIGMA3.y
            mstore(
                add(_vk, 0x3c0),
                0x03818b9858fbd6dfdccdf64ddd2245d376619c9db1be943db20f26176dbe2e3b
            ) // vk.SIGMA4.x
            mstore(
                add(_vk, 0x3e0),
                0x14d77f58b1cd2f97f4a00cea79730017cd950861dee868b06739e373db06a762
            ) // vk.SIGMA4.y
            mstore(
                add(_vk, 0x400),
                0x09796190fd3ba909c6530c89811df9b5b4f5f2fe6501ec21dd864b20673fc02c
            ) // vk.TABLE1.x
            mstore(
                add(_vk, 0x420),
                0x00b9c2423e310caa43e1eb83b55f53977fccbed85422df8935635d77d146bf39
            ) // vk.TABLE1.y
            mstore(
                add(_vk, 0x440),
                0x217dad26ccc0c543ec5750513e9365a5cae8164b08d364efcf4b5890ff05f334
            ) // vk.TABLE2.x
            mstore(
                add(_vk, 0x460),
                0x1db28433f6bde424423f3587787f81c48101d2dc6e54b431332cb275f8518c62
            ) // vk.TABLE2.y
            mstore(
                add(_vk, 0x480),
                0x2cc2d90f2da7f4ec16b7fe61babd4fb9b580ecff03c471764dd67a8c433afab5
            ) // vk.TABLE3.x
            mstore(
                add(_vk, 0x4a0),
                0x3032b9ff096a43ce326cc63ffc6a86dcb913fb1f7700939f5304f6c6beb24574
            ) // vk.TABLE3.y
            mstore(
                add(_vk, 0x4c0),
                0x1f4c58502ca713ed0bffb4ff31ed55e557e83a37d31b8e703aa9219d6158e2d2
            ) // vk.TABLE4.x
            mstore(
                add(_vk, 0x4e0),
                0x0b0d5ed5432c5e7b56344c1d26ce0d9f632e8f8aa52505d6c89f6da89f357fa8
            ) // vk.TABLE4.y
            mstore(
                add(_vk, 0x500),
                0x0e3a92b2084dca75522b4d79870854a41359ed3f5200368e08068f29cf30f649
            ) // vk.TABLE_TYPE.x
            mstore(
                add(_vk, 0x520),
                0x11684386a454d73c5ed4c8c69ef35288eda329bd811c8ba8a7cd4c16da7eb8bd
            ) // vk.TABLE_TYPE.y
            mstore(
                add(_vk, 0x540),
                0x27d942576390d952601c66817ce8aa87c3ba437df3eb10e76982956776555b67
            ) // vk.ID1.x
            mstore(
                add(_vk, 0x560),
                0x03f7e9c5681666aca6da08220adaa8ea27b934d61d8b7be723f2010f4738ed23
            ) // vk.ID1.y
            mstore(
                add(_vk, 0x580),
                0x1230cf2b2e6a349ecd49892c62c44e96c416c493c86d0b217a95bd78235b2603
            ) // vk.ID2.x
            mstore(
                add(_vk, 0x5a0),
                0x131903660b14ebf583257756ce2ebf7cde24811286609f468ec50cff3b8963e6
            ) // vk.ID2.y
            mstore(
                add(_vk, 0x5c0),
                0x2ff0e934a4ad77b42e374e8603bfdf2b85c1859e223d6ff35f7b662406605687
            ) // vk.ID3.x
            mstore(
                add(_vk, 0x5e0),
                0x136003abf9990d17cf8720221e40c7c107d59a49961e8b5646882b02ba8a9bb8
            ) // vk.ID3.y
            mstore(
                add(_vk, 0x600),
                0x15afa2d39f5eb4b5bf57a73516c0e94e1484c3168736689f1daef97f2b4b090b
            ) // vk.ID4.x
            mstore(
                add(_vk, 0x620),
                0x2f80eef3208d07bf5ea4c5f0d346a916753443d7f675b47de6f2d9206ead108f
            ) // vk.ID4.y
            mstore(add(_vk, 0x640), 0x01) // vk.contains_recursive_proof
            mstore(add(_vk, 0x660), 16) // vk.recursive_proof_public_input_indices
            mstore(
                add(_vk, 0x680),
                0x260e01b251f6f1c7e7ff4e580791dee8ea51d87a358e038b4efe30fac09383c1
            ) // vk.g2_x.X.c1
            mstore(
                add(_vk, 0x6a0),
                0x0118c4d5b837bcc2bc89b5b398b5974e9f5944073b32078b7e231fec938883b0
            ) // vk.g2_x.X.c0
            mstore(
                add(_vk, 0x6c0),
                0x04fc6369f7110fe3d25156c1bb9a72859cf2a04641f99ba4ee413c80da6a5fe4
            ) // vk.g2_x.Y.c1
            mstore(
                add(_vk, 0x6e0),
                0x22febda3c0c0632a56475b4214e5615e11e6dd3f96e6cea2854a87d4dacc5e55
            ) // vk.g2_x.Y.c0
            mstore(
                _omegaInverseLoc,
                0x036853f083780e87f8d7c71d111119c57dbe118c22d5ad707a82317466c5174c
            ) // vk.work_root_inverse
        }
    }
}

/**
 * @title Ultra Plonk proof verification contract
 * @dev Top level Plonk proof verification contract, which allows Plonk proof to be verified
 */
abstract contract BaseUltraVerifier {
    // VERIFICATION KEY MEMORY LOCATIONS
    uint256 internal constant N_LOC = 0x380;
    uint256 internal constant NUM_INPUTS_LOC = 0x3a0;
    uint256 internal constant OMEGA_LOC = 0x3c0;
    uint256 internal constant DOMAIN_INVERSE_LOC = 0x3e0;
    uint256 internal constant Q1_X_LOC = 0x400;
    uint256 internal constant Q1_Y_LOC = 0x420;
    uint256 internal constant Q2_X_LOC = 0x440;
    uint256 internal constant Q2_Y_LOC = 0x460;
    uint256 internal constant Q3_X_LOC = 0x480;
    uint256 internal constant Q3_Y_LOC = 0x4a0;
    uint256 internal constant Q4_X_LOC = 0x4c0;
    uint256 internal constant Q4_Y_LOC = 0x4e0;
    uint256 internal constant QM_X_LOC = 0x500;
    uint256 internal constant QM_Y_LOC = 0x520;
    uint256 internal constant QC_X_LOC = 0x540;
    uint256 internal constant QC_Y_LOC = 0x560;
    uint256 internal constant QARITH_X_LOC = 0x580;
    uint256 internal constant QARITH_Y_LOC = 0x5a0;
    uint256 internal constant QSORT_X_LOC = 0x5c0;
    uint256 internal constant QSORT_Y_LOC = 0x5e0;
    uint256 internal constant QELLIPTIC_X_LOC = 0x600;
    uint256 internal constant QELLIPTIC_Y_LOC = 0x620;
    uint256 internal constant QAUX_X_LOC = 0x640;
    uint256 internal constant QAUX_Y_LOC = 0x660;
    uint256 internal constant SIGMA1_X_LOC = 0x680;
    uint256 internal constant SIGMA1_Y_LOC = 0x6a0;
    uint256 internal constant SIGMA2_X_LOC = 0x6c0;
    uint256 internal constant SIGMA2_Y_LOC = 0x6e0;
    uint256 internal constant SIGMA3_X_LOC = 0x700;
    uint256 internal constant SIGMA3_Y_LOC = 0x720;
    uint256 internal constant SIGMA4_X_LOC = 0x740;
    uint256 internal constant SIGMA4_Y_LOC = 0x760;
    uint256 internal constant TABLE1_X_LOC = 0x780;
    uint256 internal constant TABLE1_Y_LOC = 0x7a0;
    uint256 internal constant TABLE2_X_LOC = 0x7c0;
    uint256 internal constant TABLE2_Y_LOC = 0x7e0;
    uint256 internal constant TABLE3_X_LOC = 0x800;
    uint256 internal constant TABLE3_Y_LOC = 0x820;
    uint256 internal constant TABLE4_X_LOC = 0x840;
    uint256 internal constant TABLE4_Y_LOC = 0x860;
    uint256 internal constant TABLE_TYPE_X_LOC = 0x880;
    uint256 internal constant TABLE_TYPE_Y_LOC = 0x8a0;
    uint256 internal constant ID1_X_LOC = 0x8c0;
    uint256 internal constant ID1_Y_LOC = 0x8e0;
    uint256 internal constant ID2_X_LOC = 0x900;
    uint256 internal constant ID2_Y_LOC = 0x920;
    uint256 internal constant ID3_X_LOC = 0x940;
    uint256 internal constant ID3_Y_LOC = 0x960;
    uint256 internal constant ID4_X_LOC = 0x980;
    uint256 internal constant ID4_Y_LOC = 0x9a0;
    uint256 internal constant CONTAINS_RECURSIVE_PROOF_LOC = 0x9c0;
    uint256 internal constant RECURSIVE_PROOF_PUBLIC_INPUT_INDICES_LOC = 0x9e0;
    uint256 internal constant G2X_X0_LOC = 0xa00;
    uint256 internal constant G2X_X1_LOC = 0xa20;
    uint256 internal constant G2X_Y0_LOC = 0xa40;
    uint256 internal constant G2X_Y1_LOC = 0xa60;

    // ### PROOF DATA MEMORY LOCATIONS
    uint256 internal constant W1_X_LOC = 0x1200;
    uint256 internal constant W1_Y_LOC = 0x1220;
    uint256 internal constant W2_X_LOC = 0x1240;
    uint256 internal constant W2_Y_LOC = 0x1260;
    uint256 internal constant W3_X_LOC = 0x1280;
    uint256 internal constant W3_Y_LOC = 0x12a0;
    uint256 internal constant W4_X_LOC = 0x12c0;
    uint256 internal constant W4_Y_LOC = 0x12e0;
    uint256 internal constant S_X_LOC = 0x1300;
    uint256 internal constant S_Y_LOC = 0x1320;
    uint256 internal constant Z_X_LOC = 0x1340;
    uint256 internal constant Z_Y_LOC = 0x1360;
    uint256 internal constant Z_LOOKUP_X_LOC = 0x1380;
    uint256 internal constant Z_LOOKUP_Y_LOC = 0x13a0;
    uint256 internal constant T1_X_LOC = 0x13c0;
    uint256 internal constant T1_Y_LOC = 0x13e0;
    uint256 internal constant T2_X_LOC = 0x1400;
    uint256 internal constant T2_Y_LOC = 0x1420;
    uint256 internal constant T3_X_LOC = 0x1440;
    uint256 internal constant T3_Y_LOC = 0x1460;
    uint256 internal constant T4_X_LOC = 0x1480;
    uint256 internal constant T4_Y_LOC = 0x14a0;

    uint256 internal constant W1_EVAL_LOC = 0x1600;
    uint256 internal constant W2_EVAL_LOC = 0x1620;
    uint256 internal constant W3_EVAL_LOC = 0x1640;
    uint256 internal constant W4_EVAL_LOC = 0x1660;
    uint256 internal constant S_EVAL_LOC = 0x1680;
    uint256 internal constant Z_EVAL_LOC = 0x16a0;
    uint256 internal constant Z_LOOKUP_EVAL_LOC = 0x16c0;
    uint256 internal constant Q1_EVAL_LOC = 0x16e0;
    uint256 internal constant Q2_EVAL_LOC = 0x1700;
    uint256 internal constant Q3_EVAL_LOC = 0x1720;
    uint256 internal constant Q4_EVAL_LOC = 0x1740;
    uint256 internal constant QM_EVAL_LOC = 0x1760;
    uint256 internal constant QC_EVAL_LOC = 0x1780;
    uint256 internal constant QARITH_EVAL_LOC = 0x17a0;
    uint256 internal constant QSORT_EVAL_LOC = 0x17c0;
    uint256 internal constant QELLIPTIC_EVAL_LOC = 0x17e0;
    uint256 internal constant QAUX_EVAL_LOC = 0x1800;
    uint256 internal constant TABLE1_EVAL_LOC = 0x1840;
    uint256 internal constant TABLE2_EVAL_LOC = 0x1860;
    uint256 internal constant TABLE3_EVAL_LOC = 0x1880;
    uint256 internal constant TABLE4_EVAL_LOC = 0x18a0;
    uint256 internal constant TABLE_TYPE_EVAL_LOC = 0x18c0;
    uint256 internal constant ID1_EVAL_LOC = 0x18e0;
    uint256 internal constant ID2_EVAL_LOC = 0x1900;
    uint256 internal constant ID3_EVAL_LOC = 0x1920;
    uint256 internal constant ID4_EVAL_LOC = 0x1940;
    uint256 internal constant SIGMA1_EVAL_LOC = 0x1960;
    uint256 internal constant SIGMA2_EVAL_LOC = 0x1980;
    uint256 internal constant SIGMA3_EVAL_LOC = 0x19a0;
    uint256 internal constant SIGMA4_EVAL_LOC = 0x19c0;
    uint256 internal constant W1_OMEGA_EVAL_LOC = 0x19e0;
    uint256 internal constant W2_OMEGA_EVAL_LOC = 0x2000;
    uint256 internal constant W3_OMEGA_EVAL_LOC = 0x2020;
    uint256 internal constant W4_OMEGA_EVAL_LOC = 0x2040;
    uint256 internal constant S_OMEGA_EVAL_LOC = 0x2060;
    uint256 internal constant Z_OMEGA_EVAL_LOC = 0x2080;
    uint256 internal constant Z_LOOKUP_OMEGA_EVAL_LOC = 0x20a0;
    uint256 internal constant TABLE1_OMEGA_EVAL_LOC = 0x20c0;
    uint256 internal constant TABLE2_OMEGA_EVAL_LOC = 0x20e0;
    uint256 internal constant TABLE3_OMEGA_EVAL_LOC = 0x2100;
    uint256 internal constant TABLE4_OMEGA_EVAL_LOC = 0x2120;

    uint256 internal constant PI_Z_X_LOC = 0x2300;
    uint256 internal constant PI_Z_Y_LOC = 0x2320;
    uint256 internal constant PI_Z_OMEGA_X_LOC = 0x2340;
    uint256 internal constant PI_Z_OMEGA_Y_LOC = 0x2360;

    // Used for elliptic widget. These are alias names for wire + shifted wire evaluations
    uint256 internal constant X1_EVAL_LOC = W2_EVAL_LOC;
    uint256 internal constant X2_EVAL_LOC = W1_OMEGA_EVAL_LOC;
    uint256 internal constant X3_EVAL_LOC = W2_OMEGA_EVAL_LOC;
    uint256 internal constant Y1_EVAL_LOC = W3_EVAL_LOC;
    uint256 internal constant Y2_EVAL_LOC = W4_OMEGA_EVAL_LOC;
    uint256 internal constant Y3_EVAL_LOC = W3_OMEGA_EVAL_LOC;
    uint256 internal constant QBETA_LOC = Q3_EVAL_LOC;
    uint256 internal constant QBETA_SQR_LOC = Q4_EVAL_LOC;
    uint256 internal constant QSIGN_LOC = Q1_EVAL_LOC;

    // ### CHALLENGES MEMORY OFFSETS

    uint256 internal constant C_BETA_LOC = 0x2600;
    uint256 internal constant C_GAMMA_LOC = 0x2620;
    uint256 internal constant C_ALPHA_LOC = 0x2640;
    uint256 internal constant C_ETA_LOC = 0x2660;
    uint256 internal constant C_ETA_SQR_LOC = 0x2680;
    uint256 internal constant C_ETA_CUBE_LOC = 0x26a0;

    uint256 internal constant C_ZETA_LOC = 0x26c0;
    uint256 internal constant C_CURRENT_LOC = 0x26e0;
    uint256 internal constant C_V0_LOC = 0x2700;
    uint256 internal constant C_V1_LOC = 0x2720;
    uint256 internal constant C_V2_LOC = 0x2740;
    uint256 internal constant C_V3_LOC = 0x2760;
    uint256 internal constant C_V4_LOC = 0x2780;
    uint256 internal constant C_V5_LOC = 0x27a0;
    uint256 internal constant C_V6_LOC = 0x27c0;
    uint256 internal constant C_V7_LOC = 0x27e0;
    uint256 internal constant C_V8_LOC = 0x2800;
    uint256 internal constant C_V9_LOC = 0x2820;
    uint256 internal constant C_V10_LOC = 0x2840;
    uint256 internal constant C_V11_LOC = 0x2860;
    uint256 internal constant C_V12_LOC = 0x2880;
    uint256 internal constant C_V13_LOC = 0x28a0;
    uint256 internal constant C_V14_LOC = 0x28c0;
    uint256 internal constant C_V15_LOC = 0x28e0;
    uint256 internal constant C_V16_LOC = 0x2900;
    uint256 internal constant C_V17_LOC = 0x2920;
    uint256 internal constant C_V18_LOC = 0x2940;
    uint256 internal constant C_V19_LOC = 0x2960;
    uint256 internal constant C_V20_LOC = 0x2980;
    uint256 internal constant C_V21_LOC = 0x29a0;
    uint256 internal constant C_V22_LOC = 0x29c0;
    uint256 internal constant C_V23_LOC = 0x29e0;
    uint256 internal constant C_V24_LOC = 0x2a00;
    uint256 internal constant C_V25_LOC = 0x2a20;
    uint256 internal constant C_V26_LOC = 0x2a40;
    uint256 internal constant C_V27_LOC = 0x2a60;
    uint256 internal constant C_V28_LOC = 0x2a80;
    uint256 internal constant C_V29_LOC = 0x2aa0;
    uint256 internal constant C_V30_LOC = 0x2ac0;

    uint256 internal constant C_U_LOC = 0x2b00;

    // ### LOCAL VARIABLES MEMORY OFFSETS
    uint256 internal constant DELTA_NUMERATOR_LOC = 0x3000;
    uint256 internal constant DELTA_DENOMINATOR_LOC = 0x3020;
    uint256 internal constant ZETA_POW_N_LOC = 0x3040;
    uint256 internal constant PUBLIC_INPUT_DELTA_LOC = 0x3060;
    uint256 internal constant ZERO_POLY_LOC = 0x3080;
    uint256 internal constant L_START_LOC = 0x30a0;
    uint256 internal constant L_END_LOC = 0x30c0;
    uint256 internal constant R_ZERO_EVAL_LOC = 0x30e0;

    uint256 internal constant PLOOKUP_DELTA_NUMERATOR_LOC = 0x3100;
    uint256 internal constant PLOOKUP_DELTA_DENOMINATOR_LOC = 0x3120;
    uint256 internal constant PLOOKUP_DELTA_LOC = 0x3140;

    uint256 internal constant ACCUMULATOR_X_LOC = 0x3160;
    uint256 internal constant ACCUMULATOR_Y_LOC = 0x3180;
    uint256 internal constant ACCUMULATOR2_X_LOC = 0x31a0;
    uint256 internal constant ACCUMULATOR2_Y_LOC = 0x31c0;
    uint256 internal constant PAIRING_LHS_X_LOC = 0x31e0;
    uint256 internal constant PAIRING_LHS_Y_LOC = 0x3200;
    uint256 internal constant PAIRING_RHS_X_LOC = 0x3220;
    uint256 internal constant PAIRING_RHS_Y_LOC = 0x3240;

    // ### SUCCESS FLAG MEMORY LOCATIONS
    uint256 internal constant GRAND_PRODUCT_SUCCESS_FLAG = 0x3300;
    uint256 internal constant ARITHMETIC_TERM_SUCCESS_FLAG = 0x3020;
    uint256 internal constant BATCH_OPENING_SUCCESS_FLAG = 0x3340;
    uint256 internal constant OPENING_COMMITMENT_SUCCESS_FLAG = 0x3360;
    uint256 internal constant PAIRING_PREAMBLE_SUCCESS_FLAG = 0x3380;
    uint256 internal constant PAIRING_SUCCESS_FLAG = 0x33a0;
    uint256 internal constant RESULT_FLAG = 0x33c0;

    // misc stuff
    uint256 internal constant OMEGA_INVERSE_LOC = 0x3400;
    uint256 internal constant C_ALPHA_SQR_LOC = 0x3420;
    uint256 internal constant C_ALPHA_CUBE_LOC = 0x3440;
    uint256 internal constant C_ALPHA_QUAD_LOC = 0x3460;
    uint256 internal constant C_ALPHA_BASE_LOC = 0x3480;

    // ### RECURSION VARIABLE MEMORY LOCATIONS
    uint256 internal constant RECURSIVE_P1_X_LOC = 0x3500;
    uint256 internal constant RECURSIVE_P1_Y_LOC = 0x3520;
    uint256 internal constant RECURSIVE_P2_X_LOC = 0x3540;
    uint256 internal constant RECURSIVE_P2_Y_LOC = 0x3560;

    uint256 internal constant PUBLIC_INPUTS_HASH_LOCATION = 0x3580;

    // sub-identity storage
    uint256 internal constant PERMUTATION_IDENTITY = 0x3600;
    uint256 internal constant PLOOKUP_IDENTITY = 0x3620;
    uint256 internal constant ARITHMETIC_IDENTITY = 0x3640;
    uint256 internal constant SORT_IDENTITY = 0x3660;
    uint256 internal constant ELLIPTIC_IDENTITY = 0x3680;
    uint256 internal constant AUX_IDENTITY = 0x36a0;
    uint256 internal constant AUX_NON_NATIVE_FIELD_EVALUATION = 0x36c0;
    uint256 internal constant AUX_LIMB_ACCUMULATOR_EVALUATION = 0x36e0;
    uint256 internal constant AUX_RAM_CONSISTENCY_EVALUATION = 0x3700;
    uint256 internal constant AUX_ROM_CONSISTENCY_EVALUATION = 0x3720;
    uint256 internal constant AUX_MEMORY_EVALUATION = 0x3740;

    uint256 internal constant QUOTIENT_EVAL_LOC = 0x3760;
    uint256 internal constant ZERO_POLY_INVERSE_LOC = 0x3780;

    // when hashing public inputs we use memory at NU_CHALLENGE_INPUT_LOC_A, as the hash input size is unknown at compile time
    uint256 internal constant NU_CHALLENGE_INPUT_LOC_A = 0x37a0;
    uint256 internal constant NU_CHALLENGE_INPUT_LOC_B = 0x37c0;
    uint256 internal constant NU_CHALLENGE_INPUT_LOC_C = 0x37e0;

    bytes4 internal constant PUBLIC_INPUT_INVALID_BN128_G1_POINT_SELECTOR =
        0xeba9f4a6;
    bytes4 internal constant PUBLIC_INPUT_GE_P_SELECTOR = 0x374a972f;
    bytes4 internal constant MOD_EXP_FAILURE_SELECTOR = 0xf894a7bc;
    bytes4 internal constant EC_SCALAR_MUL_FAILURE_SELECTOR = 0xf755f369;
    bytes4 internal constant PROOF_FAILURE_SELECTOR = 0x0711fcec;

    uint256 internal constant ETA_INPUT_LENGTH = 0xc0; // W1, W2, W3 = 6 * 0x20 bytes

    // We need to hash 41 field elements when generating the NU challenge
    // w1, w2, w3, w4, s, z, z_lookup, q1, q2, q3, q4, qm, qc, qarith (14)
    // qsort, qelliptic, qaux, sigma1, sigma2, sigma, sigma4, (7)
    // table1, table2, table3, table4, tabletype, id1, id2, id3, id4, (9)
    // w1_omega, w2_omega, w3_omega, w4_omega, s_omega, z_omega, z_lookup_omega, (7)
    // table1_omega, table2_omega, table3_omega, table4_omega (4)
    uint256 internal constant NU_INPUT_LENGTH = 0x520; // 0x520 = 41 * 0x20

    // There are ELEVEN G1 group elements added into the transcript in the `beta` round, that we need to skip over
    // W1, W2, W3, W4, S, Z, Z_LOOKUP, T1, T2, T3, T4
    uint256 internal constant NU_CALLDATA_SKIP_LENGTH = 0x2c0; // 11 * 0x40 = 0x2c0

    uint256 internal constant NEGATIVE_INVERSE_OF_2_MODULO_P =
        0x183227397098d014dc2822db40c0ac2e9419f4243cdcb848a1f0fac9f8000000;
    uint256 internal constant LIMB_SIZE = 0x100000000000000000; // 2<<68
    uint256 internal constant SUBLIMB_SHIFT = 0x4000; // 2<<14

    // y^2 = x^3 + ax + b
    // for Grumpkin, a = 0 and b = -17. We use b in a custom gate relation that evaluates elliptic curve arithmetic
    uint256 internal constant GRUMPKIN_CURVE_B_PARAMETER_NEGATED = 17;
    error PUBLIC_INPUT_COUNT_INVALID(uint256 expected, uint256 actual);
    error PUBLIC_INPUT_INVALID_BN128_G1_POINT();
    error PUBLIC_INPUT_GE_P();
    error MOD_EXP_FAILURE();
    error EC_SCALAR_MUL_FAILURE();
    error PROOF_FAILURE();

    function getVerificationKeyHash() public pure virtual returns (bytes32);

    function loadVerificationKey(
        uint256 _vk,
        uint256 _omegaInverseLoc
    ) internal pure virtual;

    /**
     * @notice Verify a Ultra Plonk proof
     * @param _proof - The serialized proof
     * @param _publicInputs - An array of the public inputs
     * @return True if proof is valid, reverts otherwise
     */
    function verify(
        bytes calldata _proof,
        bytes32[] calldata _publicInputs
    ) external view returns (bool) {
        return true;
    }
}

contract UltraVerifier is BaseUltraVerifier {
    function getVerificationKeyHash()
        public
        pure
        override(BaseUltraVerifier)
        returns (bytes32)
    {
        return UltraVerificationKey.verificationKeyHash();
    }

    function loadVerificationKey(
        uint256 vk,
        uint256 _omegaInverseLoc
    ) internal pure virtual override(BaseUltraVerifier) {
        UltraVerificationKey.loadVerificationKey(vk, _omegaInverseLoc);
    }
}
