import React from 'react';
import { Progress } from 'reactstrap';

export default class DevLayout extends React.PureComponent {
    // Header
    _header() {
        return (
            <div className="siteHeader d-flex justify-content-between">
                <a className="btnBack" href="#">
                    <img src="/images/homework/back.png" />
                </a>

                <div className="instruction">
                    {/* class de an: hidden */}
                    <div className="inner d-flex align-items-center">
                        <div>Choose sentences</div>
                    </div>
                </div>

                <a className="btnInstruction" href="#">
                    <img src="/images/homework/voiceBlue.png" />
                </a>
            </div>
        );
    }

    // Footer
    _footer() {
        return (
            <div className="siteFooter">
                <div className="progressWrap">
                    <div className="number">4/12</div>
                    <Progress value="25" />
                </div>
                <div className="btnNextWrap pl-4 d-flex justify-content-center align-items-center">
                    {/* class de an: hidden */}
                    <span className="text mr-3 mt-2">Next</span>
                    <button className="btn-3d btn-rounded-circle btn-pink">
                        <svg style={{ height: '45px' }} viewBox="0 0 256 512">
                            <path
                                fill="currentColor"
                                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    _typeOne() {
        // https://drive.google.com/drive/u/0/folders/133RGhExEfhqhLg6obFXyLwJyRXx1weiM
        return (
            <div className="typeOne d-flex justify-content-center flex-column align-items-center">
                <div className="imgVoiceWrap">
                    <img src="https://via.placeholder.com/1000x650" />
                    <a className="voiceWrap">
                        <img src="/images/homework/voiceYellow.png" />
                    </a>
                </div>

                <div className="d-flex justify-content-between mt-5">
                    <button className={`btn-3d btn-green btn-rounded fz-26 mr-4`}>
                        <span>True</span>
                    </button>
                    <button className={`btn-3d btn-red btn-rounded fz-26 ml-4`}>
                        <span>False</span>
                    </button>
                </div>
            </div>
        );
    }

    _typeTwo() {
        // https://drive.google.com/drive/u/0/folders/18So_bLCu1wcMJHBhXUPSlJSnIJgLSMmb
        return (
            <div className="typeTwo container">
                <button className="btn-3d btn-orange btn-rounded fz-26 px-4 py-3 w-100  ">
                    <div className="d-flex justify-content-between">
                        <div>Throwing trash in our environment can harm Earth.</div>
                        <span className="active-wrap">
                            <span className="active-checked" />
                        </span>
                    </div>
                </button>

                <button className="btn-3d btn-orange btn-rounded fz-26 px-4 py-3 w-100 mt-5">
                    <div className="d-flex justify-content-between">
                        <div>Collecting trash in our environment can harm Earth.</div>
                        <span className="active-wrap">
                            <span className="active-checked">
                                <img src="/images/homework/homeworkCheck.png" />
                            </span>
                        </span>
                    </div>
                </button>

                <button className="btn-3d btn-orange btn-rounded fz-26 px-4 py-3 w-100 mt-5">
                    <div className="d-flex justify-content-between">
                        <div>Walking in our environment can harm Earth.</div>
                        <span className="active-wrap">
                            <span className="active-checked" />
                        </span>
                    </div>
                </button>
            </div>
        );
    }

    _typeThree() {
        // https://drive.google.com/drive/u/0/folders/1AxGjV0DXFPdVe1s9qeA0qCN7acmh13jH
        // return (
        //     <div className="typeThree container">
        //         <div className="row dropWrap">
        //             <div className="col-4">
        //                 <div className="number">1</div>
        //                 <div className="box" />
        //             </div>
        //             <div className="col-4">
        //                 <div className="number">2</div>
        //                 <div className="box" />
        //             </div>
        //             <div className="col-4">
        //                 <div className="number">3</div>
        //                 <div className="box" />
        //             </div>
        //         </div>

        //         <div className="row imageWrap mt-4">
        //             <div className="col-4">
        //                 <div className="imgWrap">
        //                     <img className="img-fluid" src="https://via.placeholder.com/580x380" />
        //                 </div>
        //             </div>
        //             <div className="col-4">
        //                 <div className="imgWrap">
        //                     <img className="img-fluid" src="https://via.placeholder.com/580x380" />
        //                 </div>
        //             </div>
        //             <div className="col-4">
        //                 <div className="imgWrap">
        //                     <img className="img-fluid" src="https://via.placeholder.com/580x380" />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // );

        return (
            <div className="typeThree">
                <div className="dropWrap d-flex justify-content-center">
                    <div className="boxWrap mx-3">
                        <div className="number">1</div>
                        <div className="box" />
                    </div>

                    <div className="boxWrap mx-3">
                        <div className="number">2</div>
                        <div className="box" />
                    </div>

                    <div className="boxWrap mx-3">
                        <div className="number">3</div>
                        <div className="box" />
                    </div>
                </div>
                {/* dropWrap */}

                <div className="imageWrap mt-4 d-flex justify-content-center">
                    <div className="imgWrap">
                        <img className="img-fluid" src="https://via.placeholder.com/580x380" />
                    </div>

                    <div className="imgWrap">
                        <img className="img-fluid" src="https://via.placeholder.com/580x380" />
                    </div>

                    <div className="imgWrap">
                        <img className="img-fluid" src="https://via.placeholder.com/580x380" />
                    </div>
                </div>
            </div>
        );
    }

    _typeFour() {
        // https://drive.google.com/drive/u/0/folders/1FBg4xnvhyZNqui0LrAJtoxGoYAxJ-Xwb
        return (
            <div className="typeFour container">
                <div className="d-flex justify-content-center flex-column">
                    <div className="box d-flex justify-content-between">
                        <div className="content">1. Lorem ipsum proin imperdiet lobortis bibendum ultricies orci</div>
                        <div className="chooseWrap d-flex justify-content-between align-items-center">
                            <span className="true">
                                <span className="inner" />
                            </span>
                            <span className="false">
                                <span className="inner" />
                            </span>
                        </div>
                    </div>
                    {/* Box */}

                    <div className="box d-flex justify-content-between">
                        <div className="content">
                            2. dictum rutrum torquent libero euismod libero purus orci, at eros vel dapibus vehicula
                        </div>
                        <div className="chooseWrap d-flex justify-content-between align-items-center">
                            <span className="true">
                                <span className="inner" />
                            </span>
                            <span className="false">
                                <span className="inner" />
                            </span>
                        </div>
                    </div>
                    {/* Box */}

                    <div className="box d-flex justify-content-between">
                        <div className="content">
                            3. At eros vel dapibus vehicula dictum quis mattis volutpat litora.
                        </div>
                        <div className="chooseWrap d-flex justify-content-between align-items-center">
                            <span className="true">
                                <span className="inner" />
                            </span>
                            <span className="false">
                                <span className="inner" />
                            </span>
                        </div>
                    </div>
                    {/* Box */}

                    <div className="box d-flex justify-content-between">
                        <div className="content">
                            4. Lorem ipsum proin imperdiet lobortis bibendum ultricies orci, dictum rutrum torquent
                            libero euismod libero purus orci.
                        </div>
                        <div className="chooseWrap d-flex justify-content-between align-items-center">
                            <span className="true">
                                <span className="inner" />
                            </span>
                            <span className="false">
                                <span className="inner" />
                            </span>
                        </div>
                    </div>
                    {/* Box */}
                </div>
            </div>
        );
    }

    _typeFive() {
        // https://drive.google.com/drive/u/0/folders/1FzYdjFB45pJyvM2CZxMji1skzqzsuB-Q
        return (
            <div>
                <svg className="typeFive lineConnect">
                    <line x1="760" y1="170" x2="1150" y2="540" className="" />

                    <line x1="760" y1="265" x2="1150" y2="165" className="oranges" />

                    {/* <line x1="760" y1="265" x2="1150" y2="165" className="violet" /> */}

                    {/* <line x1="760" y1="265" x2="1150" y2="165" className="blue" /> */}

                    {/* <line x1="760" y1="265" x2="1150" y2="165" className="red" /> */}

                    {/* <line x1="760" y1="265" x2="1150" y2="165" className="yellow" /> */}
                </svg>

                <div className="typeFive container">
                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">eat</div>
                            <div className="drag active" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            {/* <div className="drag active" /> */}
                            <div className="content">drove</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">go</div>
                            <div className="drag oranges active" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase spin" />
                            {/* <div className="drag oranges active" /> */}
                            <div className="content">had</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">have</div>
                            <div className="drag violet" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            <div className="drag violet active" />
                            <div className="content">bought</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">get</div>
                            <div className="drag blue" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            {/* <div className="drag blue active" /> */}
                            <div className="content">went</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">buy</div>
                            <div className="drag red" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            <div className="drag green active" />
                            <div className="content">ate</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">drive</div>
                            <div className="drag yellow" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            {/* <div className="drag yellow active" /> */}
                            <div className="content">made</div>
                        </div>
                    </div>
                    {/* group */}
                </div>
            </div>
        );
    }

    _typeSix() {
        // https://drive.google.com/drive/u/0/folders/1J9xNgTXrBZdi6HtKLJPUFZKV-kneGiO7
        return (
            <div>
                <svg className="typeSix lineConnect">
                    <line x1="760" y1="170" x2="1150" y2="540" className="" />

                    <line x1="760" y1="265" x2="1150" y2="165" className="yellow" />

                    {/* <line x1="760" y1="265" x2="1150" y2="165" className="red" /> */}
                </svg>

                <div className="typeSix container">
                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">Depend</div>
                            <div className="drag active" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            <div className="drag active" />
                            <div className="content">Strong emotions that people have.</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">Feeling</div>
                            <div className="drag yellow active" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase" />
                            <div className="drag yellow active" />
                            <div className="content">You do something many times until you are good at it.</div>
                        </div>
                    </div>
                    {/* group */}

                    <div className="group d-flex justify-content-between align-items-center">
                        <div className="dragWrap">
                            <div className="content">Practice</div>
                            <div className="drag red" />
                        </div>
                        <div className="dropWrap d-flex align-items-center justify-content-end">
                            <div className="dropBase spin" />
                            {/* <div className="drag red active" /> */}
                            <div className="content">You need or count on someone</div>
                        </div>
                    </div>
                    {/* group */}
                </div>
            </div>
        );
    }

    _typeSeven() {
        // https://drive.google.com/drive/u/0/folders/1aeJVS1F91fZfFi9a_MiPZ2DfQykc6YYt
        return (
            <div className="typeSeven container">
                <div className="contentWrap">
                    <div className="title">Our Weekend by Zoe Baker</div>
                    <div className="content">
                        Lorem Ipsum <span className="textWrap " /> is simply dummy text <span className="textWrap " />{' '}
                        of the printing and typesetting <span className="textWrap " /> industry. Lorem Ipsum{' '}
                        <span className="textWrap " /> has been the industry standard dummy text ever since{' '}
                        <span className="textWrap " />
                        the 1500s. Lorem Ipsum is simply dummy text <span className="textWrap " /> of the printing and
                        typesetting <span className="textWrap " /> industry. Lorem Ipsum has been the industry standard
                        dummy text ever since the 1500s.
                    </div>
                </div>

                <div className="mt-5">
                    <div className="d-flex justify-content-center">
                        <span className="textAnswer">Ipsum</span>
                        <span className="textAnswer">has</span>
                        <span className="textAnswer">been</span>
                        <span className="textAnswer">the</span>
                    </div>

                    <div className="mt-4 d-flex justify-content-center">
                        <span className="textAnswer">industry</span>
                        <span className="textAnswer">standard</span>
                        <span className="textAnswer">dummy</span>
                        <span className="textAnswer">ever</span>
                    </div>
                </div>
            </div>
        );
    }

    _typeEight() {
        // https://drive.google.com/drive/u/0/folders/1d2Ly48DeNHx-FsKtqP_q2llLAJJ768iP
        return (
            <div className="typeEight container">
                <div className="row imagesWrap">
                    <div className="col-4">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="dropWrap" />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="dropWrap" />
                        </div>
                    </div>

                    <div className="col-4">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="dropWrap" />
                        </div>
                    </div>
                </div>
                {/* Row */}

                <div className="d-flex justify-content-center">
                    <div className="draggable">Dog</div>
                    <div className="draggable">Cat</div>
                    <div className="draggable">Fox</div>
                </div>
            </div>
        );
    }

    _typeNine() {
        // https://drive.google.com/drive/u/0/folders/1z-k0HqWbRKWtpIx8ztVpzT4a0hj-M3Co
        return (
            <div className="typeNine container">
                <div className="row">
                    <div className="col-6 mt-4 text-right">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="checkWrap" />
                        </div>
                    </div>
                    <div className="col-6 mt-4 text-left">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="checkWrap" />
                        </div>
                    </div>
                    <div className="col-6 mt-4 text-right">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="checkWrap" />
                        </div>
                    </div>
                    <div className="col-6 mt-4 text-left">
                        <div className="imgWrap">
                            <img className="img-fluid" src="https://via.placeholder.com/615x410" />
                            <div className="checkWrap" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _typeTen() {
        // https://drive.google.com/drive/u/0/folders/1soGqnHUGwcnYkIVr4C-iES3Lst74K8RK
        return (
            <div className="typeTen container">
                <div className="d-flex justify-content-around pb-5">
                    <button className="btn-3d btn-orange btn-rounded">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded active">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap">
                                <span className="active-checked">
                                    <img src="/images/homework_check.png" alt="" style={{ width: '85px' }} />
                                </span>
                            </span>
                        </div>
                    </button>
                </div>

                <div className="d-flex justify-content-around pt-5">
                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    _typeEleven() {
        return (
            <div className="typeEleven container">
                <div className="d-flex justify-content-around pb-5">
                    <button className="btn-3d btn-orange btn-rounded">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap" />
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded active">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap" />
                        </div>
                    </button>
                </div>

                <div className="d-flex justify-content-around pt-5">
                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap" />
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            <svg viewBox="0 0 576 512" style={{ height: '50px' }}>
                                <path
                                    fill="currentColor"
                                    d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
                                />
                            </svg>
                            <span className="active-wrap" />
                        </div>
                    </button>
                </div>

                <div className="mt-5">
                    <div className="d-flex justify-content-center">
                        <span className="textAnswer">Ipsum</span>
                        <span className="textAnswer">has</span>
                        <span className="textAnswer">been</span>
                        <span className="textAnswer">the</span>
                    </div>
                </div>
            </div>
        );
    }

    _typeTwelve() {
        return (
            <div className="typeTwelve container">
                <div className="paper mx-auto" style={{ width: '62%' }}>
                    <div className="element-wrapper">
                        <div className="element">
                            <img src="/images/homework/star_line.png" className="w-100 h-auto" />
                        </div>
                        <div className="element">
                            <img src="/images/homework/square_line.png" className="w-100 h-auto" />
                        </div>
                        <div className="element">
                            <img src="/images/homework/circle_blue.png" className="w-100 h-auto" />
                        </div>
                        <div className="element">
                            <img src="/images/homework/circle_line.png" className="w-100 h-auto" />
                        </div>
                        <div className="element">
                            <img src="/images/homework/star_line.png" className="w-100 h-auto" />
                        </div>
                    </div>
                    <img src="/images/homework/paper.png" className="w-100 h-auto" />
                </div>
                <div className="pencil-box">
                    <div className="pencil pencil-orange" />
                    <div className="pencil pencil-yellow active" />
                    <div className="pencil pencil-red" />
                    {/* <div className="pencil pencil-blue" /> */}
                    {/* <div className="pencil pencil-blue" /> */}
                    {/* <div className="pencil pencil-green" /> */}
                </div>
            </div>
        );
    }

    _typeThirdteen() {
        // https://drive.google.com/drive/u/0/folders/1soGqnHUGwcnYkIVr4C-iES3Lst74K8RK
        return (
            <div className="typeThirdteen container">
                <div className="contentWrap mb-5">
                    <div className="title">
                        I am <span className="textWrap ">flying</span> in the sky by plane
                    </div>
                </div>
                <div className="d-flex justify-content-around pb-4">
                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            swimming
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded fz-26 active">
                        <div className="inner d-flex justify-content-between">
                            flying
                            <span className="active-wrap">
                                <span className="active-checked">
                                    <img src="/images/homework_check.png" alt="" style={{ width: '85px' }} />
                                </span>
                            </span>
                        </div>
                    </button>
                </div>

                <div className="d-flex justify-content-around pt-4">
                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            running
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>

                    <button className="btn-3d btn-orange btn-rounded fz-26">
                        <div className="inner d-flex justify-content-between">
                            walking
                            <span className="active-wrap">
                                <span className="active-checked" />
                            </span>
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    _typeForteen() {
        // https://drive.google.com/drive/u/0/folders/133RGhExEfhqhLg6obFXyLwJyRXx1weiM
        return (
            <div className="typeForteen d-flex justify-content-center flex-column align-items-center">
                <div className="contentWrap">
                    <div className="content">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry standard dummy text ever since the 1500s. Lorem Ipsum is simply dummy text of the
                        printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever.
                    </div>
                </div>

                <div className="d-flex justify-content-between mt-5">
                    <button className={`btn-3d btn-green btn-rounded fz-26 mr-4`}>
                        <span>True</span>
                    </button>
                    <button className={`btn-3d btn-red btn-rounded fz-26 ml-4`}>
                        <span>False</span>
                    </button>
                </div>
            </div>
        );
    }

    _typeFifteen() {
        // https://drive.google.com/drive/u/0/folders/1UnHRHRRfYr9qmjbAklCyHuc0yWHKJHqD
        return (
            <div className="typeFifteen w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-right">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <div className="answer">
                                    Marry <span className="answer-point answer-orange" />
                                </div>
                                <div className="answer">
                                    Marry <span className="answer-point answer-green" />
                                </div>
                                <div className="answer">
                                    Marry <span className="answer-point answer-red" />
                                </div>
                                <div className="answer">
                                    Marry <span className="answer-point answer-purple" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 text-center">
                            <div className="image-wrap ml-auto mr-auto" style={{ width: 400, height: 480 }}>
                                <img src="/images/homework/test-1/pic1.png" style={{ width: 400 }} />
                                <span className="dragzone dragzone-1" />
                                <span className="dragzone dragzone-2" />
                                <span className="dragzone dragzone-3" />
                                <span className="dragzone dragzone-4" />
                                <span className="dragzone dragzone-5" />
                                <span className="dragzone dragzone-6" />
                                <span className="dragzone dragzone-7" />
                                <span className="dragzone dragzone-8" />
                            </div>
                        </div>
                        <div className="col-md-3 text-left">
                            <div className="d-flex flex-column justify-content-center h-100">
                                <div className="answer">
                                    Marry <span className="answer-point answer-blue" />
                                </div>
                                <div className="answer">
                                    Marry <span className="answer-point answer-yellow" />
                                </div>
                                <div className="answer">
                                    Marry <span className="answer-point answer-pink" />
                                </div>
                                {/* <div className="answer">
                                    Marry <span className="answer-point answer-orange" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _typeSixteen() {
        return (
            <div className="typeSixteen w-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7">
                            <div className="text-center">
                                <img src="/images/homework/test-2/4.png" style={{ maxWidth: '80%', height: 'auto' }} />
                            </div>
                            <div className="question d-flex justify-content-between mt-3 align-items-center">
                                <span>1. Name of farm</span>
                                <div className="answer">
                                    <input type="text" placeholder=" " />
                                </div>
                            </div>
                            <div className="question d-flex justify-content-between mt-3 align-items-center">
                                1. Name of farm
                                <div className="answer">
                                    <input type="text" placeholder=" " />
                                </div>
                            </div>
                            <div className="question d-flex justify-content-between mt-3 align-items-center">
                                1. Name of farm
                                <div className="answer">
                                    <input type="text" placeholder=" " />
                                </div>
                            </div>
                            <div className="question d-flex justify-content-between mt-3 align-items-center">
                                1. Name of farm
                                <div className="answer">
                                    <input type="text" placeholder=" " />
                                </div>
                            </div>
                            <div className="question d-flex justify-content-between mt-3 align-items-center">
                                1. Name of farm
                                <div className="answer">
                                    <input type="text" placeholder=" " />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _typeSeventeen() {
        return (
            <div className="typeSeventeen w-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="mr-5">
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/10.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/11.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/12.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/13.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/14.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mr-5">
                                    <div>
                                        <img src="/images/homework/test-3/15.png" />
                                    </div>
                                    <div>village</div>
                                    <div className="answer">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="image-wrap">
                                <div className="row">
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/2.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/3.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/4.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/5.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/6.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/7.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/8.png" className="d-block my-3" />
                                    </div>
                                    <div className="col-md-6">
                                        <img src="/images/homework/test-3/9.png" className="d-block my-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeEighteen() {
        return (
            <div className="typeEighteen w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/5.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/6.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/7.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/8.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/9.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/10.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/11.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/12.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/13.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap">
                                            <img src="/images/homework/test-4/14.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/15.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/16.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/17.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap">
                                            <img src="/images/homework/test-4/18.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap">
                                            <img src="/images/homework/test-4/19.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="question-wrapper">
                                <h2>What does Jane want to put on?</h2>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/20.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/21.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="img-wrap checked">
                                            <img src="/images/homework/test-4/22.png" className="w-100 h-auto" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeNineteen() {
        return (
            <div className="typeNineteen w-100">
                <div className="container">
                    <div className="paper">
                        <div className="element element-a element-a-1" />
                        <div className="element element-b element-b-2" />
                        <div className="element element-c element-c-3" />
                        <div className="element element-d element-d-4" />
                        <img src="/images/homework/test-5/picture.png" />
                    </div>
                    <div className="pencil-box">
                        <div className="pencil pencil-orange" />
                        <div className="pencil pencil-blue active" />
                        <div className="pencil pencil-red" />
                    </div>
                </div>
            </div>
        );
    }
    _typeTwenty() {
        return (
            <div className="typeTwenty w-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/5.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/6.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/7.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/8.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/9.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/10.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/11.png" className="w-100 h-auto mb-3" />
                                </div>
                                <div className="col-md-6">
                                    <img src="/images/homework/test-6/12.png" className="w-100 h-auto mb-3" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="ml-5">
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    <span>1. You can hold and pick up thinks with these parts of your body</span>
                                    <div className="answer ml-5">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    1. Name of farm
                                    <div className="answer ml-5">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    1. Name of farm
                                    <div className="answer ml-5">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    1. Name of farm
                                    <div className="answer ml-5">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                                <div className="question d-flex justify-content-between mt-3 align-items-center">
                                    1. Name of farm
                                    <div className="answer ml-5">
                                        <input type="text" placeholder=" " />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeTwentyOne() {
        return (
            <div className="typeTwentyOne w-100">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <img src="/images/homework/test-7/1.png" className="w-100 h-auto" />
                        </div>
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 mb-4">
                                    <div className="question">
                                        <div className="d-flex mb-2">
                                            <div className="name">
                                                <strong>Jim:</strong>
                                            </div>
                                            <div>My grandpa bought me a car yesterday!</div>
                                        </div>
                                        <div className="d-flex">
                                            <div className="name">
                                                <strong>Paw:</strong>
                                            </div>
                                            <div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck1"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck1">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck2"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck2">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                                <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id="customCheck3"
                                                    />
                                                    <label className="custom-control-label" htmlFor="customCheck3">
                                                        Custom checkbox
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeTwentyTwo() {
        return (
            <div className="typeTwentyTwo">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur{' '}
                                <span className="answer">
                                    <input type="text" placeholder=" " />
                                </span>{' '}
                                adipiscing elit. Nulla metus felis, vulputate vitae porttitor sed, accumsan a sapien.
                                Sed posuere scelerisque blandit. Nulla ut neque posuere{' '}
                                <span className="answer">
                                    <input type="text" placeholder=" " />
                                </span>{' '}
                                augue finibus accumsan quis sit amet est. Morbi viverra mauris non justo dictum gravida.
                                Vivamus egestas, nisi vel imperdiet sollicitudin, urna lectus imperdiet mi,{' '}
                                <span className="answer">
                                    <input type="text" placeholder=" " />
                                </span>{' '}
                                a sollicitudin felis orci luctus nunc. Sed at malesuada urna, sit amet sodales erat.
                                Quisque ut feugiat diam.
                            </p>
                            <p>
                                <strong>Now choose the name for the story</strong>
                            </p>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">
                                    Custom checkbox
                                </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                <label className="custom-control-label" htmlFor="customCheck2">
                                    Custom checkbox
                                </label>
                            </div>
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                <label className="custom-control-label" htmlFor="customCheck3">
                                    Custom checkbox
                                </label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row text-center text-dark font-weight-bold">
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/6.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/7.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/8.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/9.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/10.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/11.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/12.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/13.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                                <div className="col-md-4 mb-3">
                                    <img src="/images/homework/test-8/14.png" className="w-100 h-auto" />
                                    Text Here
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeTwentyThree() {
        return (
            <div className="typeTwentyThree w-100">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className="results-wrapper">
                                <div className="result m-3">
                                    1. Cow live that <span>That</span> test test test
                                </div>
                                <div className="result m-3">
                                    1. Cow live that <span>That</span> test test test
                                </div>
                                <div className="result m-3">
                                    1. Cow live that <span>That</span> test test test
                                </div>
                                <div className="result m-3">
                                    1. Cow live that <span>That</span> test test test
                                </div>
                                <div className="result m-3">
                                    1. Cow live that <span>That</span> test test test
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <img
                                src="/images/homework/test-9/2.png"
                                className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                            />
                            <div className="d-flex mb-3 answer-wrapper">
                                <div className="mx-3">1</div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        that
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        what
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        who
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex mb-3 answer-wrapper">
                                <div className="mx-3">2</div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        that
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        what
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        who
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex mb-3 answer-wrapper">
                                <div className="mx-3">3</div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        that
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        what
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        who
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex mb-3 answer-wrapper">
                                <div className="mx-3">4</div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        that
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        what
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        who
                                    </label>
                                </div>
                            </div>
                            <div className="d-flex mb-3 answer-wrapper">
                                <div className="mx-3">5</div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        that
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        what
                                    </label>
                                </div>
                                <div className="custom-control custom-checkbox mx-3">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">
                                        who
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeTwentyFour() {
        return (
            <div className="typeTwentyFour w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img
                                src="/images/homework/test-10/1.png"
                                className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                            />
                            <div className="answer-wrapper">
                                <p>
                                    Quisque nec cursus urna. Etiam mattis at nisi ac rutrum. Aenean at risus ligula.
                                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                    himenaeos. Phasellus sit amet sapien et massa ullamcorper tempor. Aliquam ac augue
                                    lobortis, pharetra metus ut, facilisis eros.
                                </p>
                                <p>
                                    <strong>
                                        1. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input type="text" placeholder=" " />
                                        </span>{' '}
                                        adipiscing elit.
                                    </strong>
                                </p>
                                <p>
                                    <strong>
                                        2. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input type="text" placeholder=" " />
                                        </span>{' '}
                                        adipiscing elit.
                                    </strong>
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <img
                                src="/images/homework/test-10/2.png"
                                className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                            />
                            <div className="answer-wrapper">
                                <p>
                                    Quisque nec cursus urna. Etiam mattis at nisi ac rutrum. Aenean at risus ligula.
                                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                                    himenaeos. Phasellus sit amet sapien et massa ullamcorper tempor. Aliquam ac augue
                                    lobortis, pharetra metus ut, facilisis eros.
                                </p>
                                <p>
                                    <strong>
                                        3. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input type="text" placeholder=" " />
                                        </span>{' '}
                                        adipiscing elit.
                                    </strong>
                                </p>
                                <p>
                                    <strong>
                                        4. Lorem ipsum dolor sit amet, consectetur{' '}
                                        <span className="answer">
                                            <input type="text" placeholder=" " />
                                        </span>{' '}
                                        adipiscing elit.
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    _typeTwentyFive() {
        return (
            <div className="typeTwentyFive w-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img
                                src="/images/homework/test-11/1.png"
                                className="w-100 h-auto mb-3 d-block ml-auto mr-auto"
                            />
                        </div>
                        <div className="col-md-6">
                            <div className="answer-wrapper mb-3">
                                <p>
                                    <strong>Complete the sentences</strong>
                                </p>
                                <p>
                                    1. Lorem ipsum dolor sit amet, consectetur{' '}
                                    <span className="answer">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                    adipiscing elit.
                                </p>
                                <p>
                                    2. Lorem ipsum dolor sit amet, consectetur{' '}
                                    <span className="answer">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                    adipiscing elit.
                                </p>
                            </div>
                            <div className="answer-wrapper mb-3">
                                <p>
                                    <strong>Answer the questions</strong>
                                </p>
                                <p>
                                    3. Lorem ipsum dolor sit amet, consectetur{' '}
                                    <span className="answer">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                    adipiscing elit.
                                </p>
                                <p>
                                    4. Lorem ipsum dolor sit amet, consectetur{' '}
                                    <span className="answer">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                    adipiscing elit.
                                </p>
                            </div>
                            <div className="answer-wrapper">
                                <p>
                                    <strong>Now write two sentences about the picture</strong>
                                </p>
                                <p>
                                    <span className="answer sentence">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                </p>
                                <p>
                                    <span className="answer sentence">
                                        <input type="text" placeholder=" " />
                                    </span>{' '}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _typeTwentySix() {
        return (
            <div className="typeTwentySix w-100">
                <div className="container">
                    <div className="paper">
                        <div className="element element-1 element-1-1" />
                        <div className="element element-2 element-2-2" />
                        <div className="element element-3 element-3-3" />
                        <div className="element element-4 element-4-4" />
                        <div className="element element-5 element-5-5" />
                        <div className="element element-6 element-6-1" />
                        <img src="/images/homework/test-12/picture.png" />
                    </div>
                    <div className="pencil-box">
                        <div className="pencil pencil-dark-green active" />
                        <div className="pencil pencil-brown" />
                        <div className="pencil pencil-red" />
                        <div className="pencil pencil-pink" />
                        <div className="pencil pencil-yellow" />
                    </div>
                </div>
            </div>
        );
    }

    _typeTwentySeven() {
        return (
            <div className="typeTwentySeven w-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/1.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/2.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/3.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/4.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/5.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/6.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-3 my-3 text-center">
                            <h2 className="text-white">1. This is a kite</h2>
                            <p className="mb-2">
                                <img
                                    src="/images/homework/test-13/7.png"
                                    className="w-100 h-auto"
                                    style={{ maxWidth: 200 }}
                                />
                            </p>
                            <button className="btn btn-link btn-true">True</button>
                            <button className="btn btn-link btn-false">False</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="homework-wrap d-flex justify-content-between flex-column">
                {/* Header */}
                {this._header()}
                {/* Content */}
                <div className="d-flex w-100 h-100 justify-content-center align-items-center">
                    {/* {this._typeOne()} */}
                    {/* {this._typeTwo()} */}
                    {/* {this._typeThree()} */}
                    {/* {this._typeFour()} */}
                    {/* {this._typeFive()} */}
                    {/* {this._typeSix()} */}
                    {/* {this._typeSeven()} */}
                    {/* {this._typeEight()} */}
                    {/* {this._typeNine()} */}
                    {/* {this._typeTen()} */}
                    {/* {this._typeEleven()} */}
                    {/* {this._typeTwelve()} */}
                    {/* {this._typeThirdteen()} */}
                    {/* {this._typeForteen()} */}
                    {/* {this._typeFifteen()} */}
                    {/* {this._typeSixteen()} */}
                    {/* {this._typeSeventeen()} */}
                    {/* {this._typeEighteen()} */}
                    {/* {this._typeNineteen()} */}
                    {/* {this._typeTwenty()} */}
                    {/* {this._typeTwentyOne()} */}
                    {/* {this._typeTwentyTwo()} */}
                    {/* {this._typeTwentyThree()} */}
                    {/* {this._typeTwentyFour()} */}
                    {/* {this._typeTwentyFive()} */}
                    {this._typeTwentySix()}
                    {/* {this._typeTwentySeven()} */}
                </div>
                {/* Footer */}
                {this._footer()}
            </div>
        );
    }
}
