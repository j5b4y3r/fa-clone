import React, {memo, useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {searchKey} from "../redux/state/searchSlice";

const SearchHeader = ({buttons}) => {
    const dispatch = useDispatch()

    const listRefs = useRef([]);

    const [buttonId, setButtonId] = useState([

    ]);


    const addUnderline = (index)=> {
        document.querySelectorAll('#un')[index].classList.add('underline');
    }
    const removeUnderline = (index)=> {
        document.querySelectorAll('#un')[index].classList.remove('underline');
    }

    //useEffect(()=>{buttons(['free'])})

    const mejorFilterOnClick = (e, name, index) => {
        e.preventDefault();
        setButtonId(prevState => {
            const isNameInArray = prevState.includes(name);
            if (isNameInArray) {
                removeUnderline(index);
                return prevState.filter(val => val !== name);
            } else {
                // if the name is not in the array add it
                addUnderline(index);
                return [...prevState, name];
            }
        });
        buttons([...buttonId, name]); // Update buttons with the new buttonId
    };

    const handleClick = (classname)=> {
        const article = document.querySelectorAll(".wrap-icon");

            article.forEach((item)=>{
                if(classname !== 'roomy' && item.classList.contains('roomy')){
                    item.classList.remove('roomy');
                    item.classList.add(classname);
                }else if(classname !== 'compact' && item.classList.contains('compact')){
                    item.classList.remove('compact');
                    item.classList.add(classname);
                }else if(classname !== 'cheatsheet' && item.classList.contains('cheatsheet')){
                    item.classList.remove('cheatsheet');
                    item.classList.add(classname);
                }
            })
    }

    const handleChange=(e)=>{
        dispatch(searchKey(e.target.value))
    }
    useEffect(()=>{
        document.querySelectorAll('.feature-button').forEach(element => {element.click();});
    },[])

    return (
        <>
            <section className="search-header">
                <div className="container w-100">
                    <div className="search-section">
                        <div className="search-field">
                            <div className="input-field">
                                <span className="search-icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </span>
                                <input onChange={handleChange} className="search-input" type="search" placeholder="Search 30,031 icons"/>
                            </div>
                            <div className="powered-by">
                                <span className="powered-by-text">
                                    !Powered by <span><i className="svg-inline--fa fa-algolia fa-lg"></i> </span> Algolia
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="feature-filter">
                        <div className="feature-section">
                            <div className="feature-items">
                                <button onClick={(event)=>mejorFilterOnClick(event,"classic",0)} id="classic" className="feature-button">
                                    <span id="un"></span>
                                    <span className="feature-icon">
                                        <i className="fa-solid fa-icons fa-fw fa-2x"></i>
                                    </span>
                                    <span className="feature-label">Classic</span>
                                </button>
                                <button onClick={(event) => mejorFilterOnClick(event, "sharp",1)} id="sharp"
                                        className="feature-button">
                                    <span id="un"></span>
                                    <span className="feature-icon">
                                        <i className="fa-solid fa-icons fa-fw fa-2x"></i>
                                    </span>
                                    <span className="feature-label">Sharp</span>
                                </button>
                                <button onClick={(event) => mejorFilterOnClick(event, "brands",2)} id="brands"
                                        className="feature-button">
                                    <span id="un"></span>
                                    <span className="feature-icon">
                                        <i className="fa-brands fa-font-awesome-flag fa-fw fa-2x"></i>
                                    </span>
                                    <span className="feature-label">Brands</span>
                                </button>
                                <button onClick={(event) => mejorFilterOnClick(event, "free",3)} id="free"
                                        className="feature-button">
                                    <span id="un" className="span-un"></span>
                                    <span className="feature-icon">
                                        <i className="fa fa-bolt fa-fw fa-2x"></i>
                                    </span>
                                    <span className="feature-label">Free</span>
                                </button>
                            </div>
                        </div>
                        <div className="filter-section">
                            <div className="filter-filter d-none">
                                <button className="filter-button btn-noborder">
                                    <span className="filter">
                                        <i className="fa-solid fa-icons fa-fw fa-2x"></i>
                                    </span>
                                    <span className="feature-label">Search Filters</span>
                                </button>
                            </div>
                            <div className="filter-display">
                                <button onClick={()=>handleClick("roomy")} ref={(e)=>(listRefs.current[0]=e)} className="display-roomy btn-noborder">
                                    <span className="filter-icon">
                                        <i className="fa-solid fa-border-all"></i>
                                    </span>
                                </button>
                                <button onClick={()=>handleClick("compact")} ref={(e)=>(listRefs.current[1]=e)} className="display-compact btn-noborder">
                                    <span className="filter-icon">
                                        <i className="fa-solid fa-table-cells"></i>
                                    </span>
                                </button>
                                <button onClick={()=>handleClick("cheatsheet")} ref={(e)=>(listRefs.current[2]=e)} className="display-cheatsheet btn-noborder">
                                    <span className="filter-icon">
                                        <i className="fa-solid fa-list-ul"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="filter-feature">
                                <select className="feature-select">
                                    <option value="Featured">Featured</option>
                                    <option value="Alphabetical">Alphabetical</option>
                                    <option value="Release">Release</option>
                                </select>
                            </div>
                            <div className="filter-version">
                                <select className="version-select">
                                    <option value="lastest">6.5.1</option>
                                    <option value="older">5.15.3</option>
                                    <option value="other">Other versions</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    );
};

export default  memo(SearchHeader);
