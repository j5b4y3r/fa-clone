import React, {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import axios from "axios";
import { useSelector } from "react-redux";

const SectionMain = (buttons) => {
    const key = useSelector(state => state.search.value);

    const [data, setData] = useState(null);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(50);
    const [pageNo, setPageNo] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [selected, setSelected] = useState([]);
    const [allIcons, setAllIcons] = useState([]);
    const [classname, setClassname] = useState("compact");
    const [freeIcons, setFreeIcons] = useState([]);
    const [proIcons, setProIcons] = useState([]);
    const [buttonId, setButtonId] = useState([]);

    const articleRef = useRef(null);
    const cpyPpRef = useRef([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8008/api/data');
            setData(response.data[0]);
            setIsDataLoaded(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const goNext = () => {
        const totalLength = key ? searchResults.length : allIcons.length;
        if (end < totalLength) {
            setStart(end);
            setEnd(end + 50);
            setPageNo(pageNo + 1);
        }
    };

    const allIconsData = useMemo(() => (
        data ? [
            ...(data.solid || []),
            ...(data.regular || []),
            ...(data.light || []),
            ...(data.thin || []),
            ...(data.duotone || []),
        ] : []
    ), [data]);

    useEffect(() => {
        const freeIcons = allIcons.filter((icon) => (icon.type === 'free'));
        const proIcons = allIcons.filter((icon) => (icon.type === 'pro'));
        setFreeIcons(freeIcons);
        setProIcons(proIcons);
    }, [allIcons]);

    const goPrev = () => {
        if (start >= 50) {
            setEnd(start);
            setStart(start - 50);
            setPageNo(pageNo - 1);
        }
    };

    const searchData = useCallback((dataArray, query) => {
        const sanitizedQuery = query.toLowerCase().trim();
        if (!sanitizedQuery) return dataArray; // If the query is empty, return the entire array
        return dataArray.filter(item => {
            const itemName = item.name.toLowerCase();
            return itemName.includes(sanitizedQuery);
        });
    }, []);

    useEffect(() => {
        if (allIcons && key !== '') {
            const results = searchData(allIcons, key);
            setSearchResults(results);
            setPageNo(1); // Reset page number when performing a new search
        }else {setSearchResults([])}
    }, [allIcons, key, searchData]);


    useMemo(()=>{
        try{
            const article = articleRef.current;
            if (isDataLoaded && article) {
                if(article.classList.contains('roomy')){
                    setClassname("roomy");
                }else if(article.classList.contains('compact')){
                    setClassname("compact");
                }else if(article.classList.contains('cheatsheet')){
                    setClassname("cheatsheet");
                }
            }
        }finally {}

    },[articleRef, key])
    //console.log(classname)

    useEffect(()=>{
        if(document.getElementById("free").classList.value.includes('underline')){
            setButtonId((buttonId) => [...buttonId, 'free'])
        }
    },[])


    const renderIcon = useMemo(() => {
        if (!isDataLoaded || !data) {
            return null; // Return early if data is not yet loaded
        }

        // Filter icons based on search query
        const iconsToRender = key || searchResults.length > 0? searchResults : allIcons;

        // Slice icons based on pagination
        const iconsOnPage = iconsToRender.slice(start, end);

        const showCpyPp=(index)=>{
            if(cpyPpRef.current[index]){
                cpyPpRef.current[index].classList.toggle('d-none')
            }
        }

        const copyToClipboard = (item)=>{
            navigator.clipboard.writeText(`<i class="${item.className}"></i>`).then(r => console.log(r));
        }

        const copyPopUp=(item, index)=>{
            return (
                <div ref={(e) => (cpyPpRef.current[index] = e)} key={index} className={"d-none"}>
                    <div onClick={()=>showCpyPp(index)} className="copyClassNamePopup">

                    </div>

                    <div className="popup-body">
                        <div onClick={() => showCpyPp(index)} className="croseBtn">
                            <span>
                                <i className="fa-regular fa-circle-xmark"></i>
                            </span>
                        </div>
                        <div className="popup-header">
                            <h1 className="popup-header-title">{item.name}</h1>
                        </div>
                        <div className="popup-inner-body">
                            <div className="popup-body-icon">
                            <span className="pop-icon">
                                <i className={item.className}></i>
                            </span>
                            </div>
                            <div className="popup-body-download">
                                <div className="popup-style-icon" style={{margin:"5px"}}>
                                    <i className="fa-solid fa-circle" style={{color: "#FFD43B",fontSize: "14px", paddingRight:"5px",paddingBottom:"10px", cursor: "wait"}}></i>
                                    <i className="fa-solid fa-circle" style={{color: "green",fontSize: "14px", paddingRight:"5px",paddingBottom:"10px", cursor:"auto"}}></i>
                                    <i className="fa-solid fa-circle" style={{color: "red",fontSize: "14px", paddingRight:"5px",paddingBottom:"10px", cursor: "auto"}}></i>
                                </div>
                                <hr style={{width:"100%", height:"1px", backgroundColor:"gray", border:"none",outline:"none"}}/>
                                <div onClick={()=>copyToClipboard(item)} className="popup-body-download-copy">
                                    <div className="hint">Copy to clipboard</div>
                                    <div className="hint-done">Copied to clipboard</div>
                                    <span className="copy-span-i">{'<i '}</span>
                                    <span className="copy-span-class">{`class=`}</span>
                                    <span className="copy-span-className">{`"${item.className}"`}</span>
                                    <span className="copy-span-i">{`>`}</span>
                                    <span className="copy-span-i">{`</i`}{`>`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        }

        function showPro(item) {
            if (item.type === 'pro') {
                return <span id="pro">PRO</span>;
            } else {
                return null;
            }
        }

        // Render the icons
        return iconsOnPage.map((item, i) => (
            <div>
                {copyPopUp(item, i)}
                <article onClick={() => showCpyPp(i)} ref={articleRef} key={i} id={item.name}
                         className={`wrap-icon ${classname} with-top-tag`}>
                    {showPro(item)}
                    <button className="icon flat">
                <span className="pb-1">
                    <i className={item.className}></i>
                </span>
                        <span className="icon-name">{item.name}</span>
                    </button>
                </article>
            </div>
        ));
    }, [isDataLoaded, data, key, searchResults, allIcons, start, end, classname]);

    const maxPages = useMemo(() => {
        const totalLength = key || searchResults.length > 0 ? searchResults.length : allIcons.length;
        return Math.ceil(totalLength / 50);
    }, [allIcons, searchResults, key]);


    //filtering ------------------------------------
    const checkBoxOnChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setSelected((prevState) => [...prevState, value]);
        } else {
            setSelected(prevState =>
                prevState.filter(val => val !== value)
            )
        }
    }


    useEffect(()=>{
        const isFreeButtonSelected = document.querySelector('.span-un').classList.value ==='span-un underline';

        // Update allIcons based on the "free" button selection
        if (isFreeButtonSelected) {
            setSearchResults(freeIcons);
        }else{
            setSearchResults(proIcons)
        }
    },[freeIcons, proIcons,buttons.buttons, selected, allIconsData])

    useEffect(() => {
        if (isDataLoaded) {
           
            if (selected.length > 0) {
                // Update allIcons based on selected categories
                const selectedIcons = Object.entries(data)
                    .filter(([category]) => selected.includes(category))
                    .reduce((acc, [category, items]) => [...acc, ...items], []);
                setAllIcons(selectedIcons);
            } else {
                // Fall back to all icons data
                setAllIcons(allIconsData);
            }
        }
    }, [isDataLoaded, buttons.buttons, selected, allIconsData]);





    return (
        <>
            <div className="section-main">
                <div className="container w-100 app-main">
                    <div className="filter-side">
                        <div className="filter-side --style">
                            <ul className="filter-style-list">
                                <li className="filter-style solid">
                                    <label className="filter-style-label">
                                        <input onChange={checkBoxOnChange} id="solid" type="checkbox" value="solid" className="filter-style-checkbox" />
                                        <span className="filter-style-icon">
                                            <i className="fa-solid fa-circle"></i>
                                        </span>
                                        <span className="span-text">
                                            <span className="icons-name">Solid</span>
                                            <span className="icons-num">{data ? data.solid.length : "--"}</span>
                                        </span>
                                    </label>
                                </li>
                                <li className="filter-style regular">
                                    <label className="filter-style-label">
                                        <input onChange={checkBoxOnChange} id="regular" type="checkbox" value="regular" className="filter-style-checkbox"/>
                                        <span className="filter-style-icon">
                                            <i className="fa fa-circle-half-stroke"></i>
                                        </span>
                                        <span className="span-text">
                                            <span className="icons-name">Regular</span>
                                            <span className="icons-num">{data?data.regular.length:"--"}</span>
                                        </span>
                                    </label>
                                </li>
                                <li className="filter-style light">
                                    <label className="filter-style-label">
                                        <input onChange={checkBoxOnChange} id="light" type="checkbox" value="light" className="filter-style-checkbox"/>
                                        <span className="filter-style-icon">
                                            <i className="fa-light fa-circle-half-stroke"></i>
                                        </span>
                                        <span className="span-text">
                                            <span className="icons-name">Light</span>
                                            <span className="icons-num">{data?data.light.length:"--"}</span>
                                        </span>
                                    </label>
                                </li>
                                <li className="filter-style thin">
                                    <label className="filter-style-label">
                                        <input onChange={checkBoxOnChange} id="thin" type="checkbox" value="thin" className="filter-style-checkbox"/>
                                        <span className="filter-style-icon">
                                            <i className="fa-thin fa-circle-half-stroke"></i>
                                        </span>
                                        <span className="span-text">
                                            <span className="icons-name">Thin</span>
                                            <span className="icons-num">{data?data.thin.length:"--"}</span>
                                        </span>
                                    </label>
                                </li>
                                <li className="filter-style duotone">
                                    <label className="filter-style-label">
                                        <input onChange={checkBoxOnChange} id="doutone" type="checkbox" value="duotone" className="filter-style-checkbox"/>
                                        <span className="filter-style-icon">
                                            <i className="fa-duotone fa-circle-half-stroke"></i>
                                        </span>
                                        <span className="span-text">
                                            <span className="icons-name">Duotone</span>
                                            <span className="icons-num">{data?data.duotone.length:"--"}</span>
                                        </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="icon-side">
                        <div className="w-100">
                            <div className="head-boby w-100">
                                <div className="wrap-state w-100 pt-2">
                                    <div className="row justify-content-between pr-4 pl-4">
                                        <div className="icon-number">
                                            <span>{key !== '' || searchResults.length > 0? searchResults.length : allIcons.length} Icons</span>
                                        </div>
                                        <div className="page-number">
                                            <span>Page {pageNo} of {maxPages !== 0 ? maxPages : 1}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="icon-results"
                                     className="icon-results listing mt-2 mb-2 pl-4">
                                    {renderIcon}
                                </div>
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    <button onClick={goPrev} style={{
                                        marginRight: '10px',
                                        marginBottom: "50px",
                                        padding: "10px",
                                        width: "100px",
                                        backgroundColor: "blue",
                                        color: "white",
                                        fontSize: "20px",
                                        borderRadius: "5px",
                                        border: "none"
                                    }}>Previous</button>
                                    <button style={{
                                        marginLeft: '10px',
                                        marginBottom: "50px",
                                        width: "100px",
                                        padding: "10px",
                                        backgroundColor: "blue",
                                        color: "gold",
                                        borderRadius: "5px",
                                        border: "none",
                                        fontSize: "20px"
                                    }} onClick={goNext}>Next</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SectionMain;
