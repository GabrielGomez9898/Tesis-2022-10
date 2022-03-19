Date.prototype.clone = function() { return new Date(this.getTime()) };

/**
 * Generates an array that contains the total number of reports by each of the 7 landmarks of the week
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, Monday, Tuesday, etc.) and the total number of reports by landmark
 */
exports.totalReportsByWeek = async (db) => {
    const date =  new Date();
    const lowerDateObject = date.clone();
    lowerDateObject.setDate(lowerDateObject.getDate() - 7);
    const upperDateObject = date.clone();

    const docs = await db.collection("reports").get();

    const totalReportsByPeriod = [];
    const currentDateInRangeObject = lowerDateObject.clone();
    for (let i = 0; i <  7; i++) {
        currentDateInRangeObject.setDate(currentDateInRangeObject.getDate() + 1);

        obj = {"reportes": 0, "tipoReportes": []};
        docs.forEach((doc, i) => {
            report = doc.data();
            reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
            reportDateObject = new Date(reportDateStr);

            formattedReportDateStr = reportDateObject.toLocaleDateString("es-CO", {"year": 'numeric', "month": 'numeric', "day": 'numeric'});
            formattedCurrentDateInRangeStr = currentDateInRangeObject.toLocaleDateString("es-CO", {"year": 'numeric', "month": 'numeric', "day": 'numeric'});
            if (formattedReportDateStr === formattedCurrentDateInRangeStr) {
                obj["reportes"]++; 
                obj["tipoReportes"].push(report["tipo_reporte"]);
            }
        });

        obj["periodo"] = currentDateInRangeObject.toLocaleDateString("es-CO", {"weekday": "long"});

        formattedCurrentDateInRangeStr = currentDateInRangeObject.toLocaleDateString("es-CO", {"year": 'numeric', "month": 'numeric', "day": 'numeric'});
        formattedUpperDateStr = upperDateObject.toLocaleDateString("es-CO", {"year": 'numeric', "month": 'numeric', "day": 'numeric'});
        if (formattedCurrentDateInRangeStr === formattedUpperDateStr) {
            obj["periodo"] = obj["periodo"] + " (hoy)";
        }

        totalReportsByPeriod.push(obj);
    }

    return totalReportsByPeriod;
};

/**
 * Generates an array that contains the total number of reports by each of the 4 landmarks of the month
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, Jan1-Jan8, Jan9-Jan17, etc.) and the total number of reports by landmark
 */
exports.totalReportsByMonth = async (db) => {
    const date =  new Date();
    const lowerDateObject = date.clone();
    lowerDateObject.setDate(lowerDateObject.getDate() - 30);
    const upperDateObject = date.clone();

    const docs = await db.collection("reports").get();

    obj = {"reportes": 0, "tipoReportes": []};

    const totalReportsByPeriod = [];
    const currentDateInRangeObject = lowerDateObject.clone();
    for (let i = 1; i <=  30; i++) {
        currentDateInRangeObject.setDate(currentDateInRangeObject.getDate() + 1);

        if(i % 6 === 1){
            beginDateObject = currentDateInRangeObject.clone();
        }
        else if(i % 6 === 0){
            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);

                if (reportDateObject >= beginDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });

            obj["periodo"] = beginDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
                                beginDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
                                "-" +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
    
            obj["periodo"] = obj["periodo"].replaceAll(".", "");

            totalReportsByPeriod.push(obj);
            obj = {"reportes": 0, "tipoReportes": []};
        }
    }

    return totalReportsByPeriod;
};

/**
 * Generates an array that contains the total number of reports by each of the 3 landmarks of the trimester
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, January, February, etc.) and the total number of reports by landmark
 */
exports.totalReportsByTrimester = async (db) => {
    date = new Date();
    year = date.getFullYear();
    month =  date.getMonth();
    day = date.getDate();
    const currentDateInRangeObject = new Date(year, month, day);

    const docs = await db.collection("reports").get();
    
    const totalReportsByPeriod = [];
    for(let i = 0; i < 3; i++){
        month = currentDateInRangeObject.getMonth() + 1;
        year = currentDateInRangeObject.getFullYear();
        numberOfDays = new Date(year, month, 0).getDate();
        dayOfMonth = currentDateInRangeObject.getDate();
        
        obj = {"reportes": 0, "tipoReportes": []};

        if(i === 0 && dayOfMonth < numberOfDays){
            lowerDateObject = currentDateInRangeObject.clone();
            lowerDateObject.setDate(lowerDateObject.getDate() - dayOfMonth + 1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
                                lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
                                "-" +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
    
            obj["periodo"] = obj["periodo"].replaceAll(".", "");
        }
        else if(i > 0) {
            lowerDateObject.setMonth(lowerDateObject.getMonth() - 1);
            lowerDateObject.setDate(1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"long"});

            // obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
            // lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
            // "-" +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
        }

        currentDateInRangeObject.setMonth(currentDateInRangeObject.getMonth() - 1);
        month = currentDateInRangeObject.getMonth() + 1;
        year = currentDateInRangeObject.getFullYear();
        numberOfDays = new Date(year, month, 0).getDate();
        currentDateInRangeObject.setDate(numberOfDays);

        totalReportsByPeriod.unshift(obj);
    }

    return totalReportsByPeriod;
};

/**
 * Generates an array that contains the total number of reports by each of the 6 landmarks of the semester
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, January, February, etc.) and the total number of reports by landmark
 */
exports.totalReportsBySemester = async (db) => {
    date = new Date();
    year = date.getFullYear();
    month =  date.getMonth();
    day = date.getDate();
    const currentDateInRangeObject = new Date(year, month, day);
    
    numberOfDays = new Date(year, month, 0).getDate();
    dayOfMonth = currentDateInRangeObject.getDate();

    const docs = await db.collection("reports").get();
    
    const totalReportsByPeriod = [];
    for(let i = 0; i < 6; i++){
        
        obj = {"reportes": 0, "tipoReportes": []};
        
        if(i === 0 && dayOfMonth < numberOfDays){
            lowerDateObject = currentDateInRangeObject.clone();
            lowerDateObject.setDate(lowerDateObject.getDate() - dayOfMonth + 1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
                                lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
                                "-" +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
    
            obj["periodo"] = obj["periodo"].replaceAll(".", "");
        }
        else if(i > 0) {
            lowerDateObject.setMonth(lowerDateObject.getMonth() - 1);
            lowerDateObject.setDate(1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"long"});

            // obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
            // lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
            // "-" +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
        }

        currentDateInRangeObject.setDate(1);

        if(currentDateInRangeObject.getMonth() === 0) {
            currentDateInRangeObject.setMonth(11);
            currentDateInRangeObject.setFullYear(currentDateInRangeObject.getFullYear() - 1);
        }
        else if(currentDateInRangeObject.getMonth() > 0) {
            currentDateInRangeObject.setMonth(currentDateInRangeObject.getMonth() - 1);
        }

        month = currentDateInRangeObject.getMonth() + 1;
        year = currentDateInRangeObject.getFullYear();
        numberOfDays = new Date(year, month, 0).getDate();
        currentDateInRangeObject.setDate(numberOfDays);

        totalReportsByPeriod.unshift(obj);
    }

    return totalReportsByPeriod;
};

/**
 * Generates an array that contains the total number of reports by each of the 12 landmarks of the year
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, January, February, etc.) and the total number of reports by landmark
 */
exports.totalReportsByYear = async (db) => {
    date = new Date();
    year = date.getFullYear();
    month =  date.getMonth();
    day = date.getDate();
    const currentDateInRangeObject = new Date(year, month, day);

    const docs = await db.collection("reports").get();
    
    const totalReportsByPeriod = [];
    for(let i = 0; i < 12; i++){
        month = currentDateInRangeObject.getMonth() + 1;
        year = currentDateInRangeObject.getFullYear();
        numberOfDays = new Date(year, month, 0).getDate();
        dayOfMonth = currentDateInRangeObject.getDate();
        
        obj = {"reportes": 0, "tipoReportes": []};

        if(i === 0 && dayOfMonth < numberOfDays){
            lowerDateObject = currentDateInRangeObject.clone();
            lowerDateObject.setDate(lowerDateObject.getDate() - dayOfMonth + 1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
                                lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
                                "-" +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
                                currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
    
            obj["periodo"] = obj["periodo"].replaceAll(".", "");
        }
        else if(i > 0) {
            lowerDateObject.setMonth(lowerDateObject.getMonth() - 1);
            lowerDateObject.setDate(1);

            docs.forEach((doc, i) => {
                report = doc.data();
                reportDateStr = report["fecha_hora"].slice(0, report["fecha_hora"].indexOf(" "));
                reportDateObject = new Date(reportDateStr);
    
                if (reportDateObject >= lowerDateObject && reportDateObject <= currentDateInRangeObject) {
                    obj["reportes"]++;
                    obj["tipoReportes"].push(report["tipo_reporte"]);
                }
            });
    
            obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"long"});

            // obj["periodo"] = lowerDateObject.toLocaleDateString("es-CO", {"month":"short"}) + 
            // lowerDateObject.toLocaleDateString("es-CO", {"day":"numeric"}) +
            // "-" +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"month": "short"}) +
            // currentDateInRangeObject.toLocaleDateString("es-CO", {"day":"numeric"});
        }

        currentDateInRangeObject.setMonth(currentDateInRangeObject.getMonth() - 1);
        month = currentDateInRangeObject.getMonth() + 1;
        year = currentDateInRangeObject.getFullYear();
        numberOfDays = new Date(year, month, 0).getDate();
        currentDateInRangeObject.setDate(numberOfDays);

        totalReportsByPeriod.unshift(obj);
    }

    return totalReportsByPeriod;
};

/**
 * Generates an array that contains the total number of reports by each landmark deduced from the oldest report date to the present date
 * @param  {Any} db The Firestore db reference used to query data
 * @return {Any[]} An array that contains objects with each period landmark (e.g, 2022, 2023, etc.) and the total number of reports by landmark
 */
exports.totalReportsForever = async (db) => {

};