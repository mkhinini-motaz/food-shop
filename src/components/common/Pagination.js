import React from 'react';
import { useSelector } from 'react-redux';
import { Pagination as MuiPagination, PaginationItem as MuiPaginationItem } from '@material-ui/lab';

import { COLOR_PRIMARY } from '../../constants';

export default function Pagination(props) {
    const selectedLangWriteFrom = useSelector(state => state.I18nReducer.selectedLangWriteFrom);
    const flexRowClassName = 'flex-row' + (selectedLangWriteFrom === 'right' ? '-reverse' : '');

    return (
        <div className="my-2">
            {props.lastPage === 1 ? '' :
                <div>
                    <MuiPagination
                        key={'category-show-product-card-pagination'}
                        className={'w_fit text-center mx-auto '}
                        classes={{ ul: flexRowClassName }}
                        page={props.currentPage}
                        count={props.lastPage}
                        renderItem={(props) => <PaginationItem {...props} selectedLangWriteFrom={selectedLangWriteFrom} />}
                        onChange={(event, page) => {
                            if (page !== props.currentPage) {
                                props.onChange(event, page)
                            }
                        }}
                    />

                    <MuiPaginationItem style={{ display: 'none', visibility: 'hidden' }} />
                </div>
            }
        </div>

    );
}

function PaginationItem(props) {
    if (['start-ellipsis', 'end-ellipsis'].indexOf(props.type) !== -1) {
        return (
            <div className="MuiPaginationItem-root MuiPaginationItem-ellipsis">
                …
            </div>
        );
    }

    let classNames = 'MuiButtonBase-root MuiPaginationItem-root MuiPaginationItem-page';
    if (props.disabled) {
        classNames += ' Mui-disabled';
    }

    const svgPointingLeft = <svg className="MuiSvgIcon-root MuiPaginationItem-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>;
    const svgPointingRight = <svg className="MuiSvgIcon-root MuiPaginationItem-icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>;

    if (['previous', 'next'].indexOf(props.type) !== -1) {
        let buttonContent = props.type === 'previous' ? svgPointingLeft : svgPointingRight;
        if (props.selectedLangWriteFrom === 'right') {
            buttonContent = props.type === 'previous' ? svgPointingRight : svgPointingLeft
        }

        return (
            <button
                className={classNames}
                tabIndex="0"
                type="button"
                aria-label={props['aria-label']}
                onClick={props.onClick}
            >
                {buttonContent}
                <span className="MuiTouchRipple-root"></span>
            </button>
        );
    }

    let buttonStyle = { };
    if (props.selected) {
        classNames += 'Mui-selected';
        buttonStyle.backgroundColor = COLOR_PRIMARY;
        buttonStyle.color = 'white';
    }

    return (
        <button className={classNames} style={buttonStyle} tabIndex="0" type="button" aria-current={props.selected} aria-label={props['aria-label']} onClick={props.onClick}>
            {props.page}
            <span className="MuiTouchRipple-root"></span>
        </button>
    );
}
