import React from 'react';

export default function Solutions({paths, dists}) {
    return (
        <div>
            {
                paths.length > 0 &&
                paths.map((item, index) => (
                        <React.Fragment>
                            <div
                                key={`health${index}`}
                            >
                                Длинна пути: {dists[index]}}
                            </div>
                            <div
                                key={`path${index}`}
                            >
                                Путь: {item.join(' -> ')}
                            </div>
                            <br/>
                        </React.Fragment>
                    )
                )
            }
        </div>
    );
};
