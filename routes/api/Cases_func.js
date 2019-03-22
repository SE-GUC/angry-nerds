
global.revenues159 = 51
global.revenues72 = 100
global.debt159 = 5
global.debt72 = 6



const Case = require('../../models/Cases');
const Staff = require('../../models/Staff');
const fun = require('./Cases_func')
const cases = require('./Cases');
const staffs = require('./Staff');
const listing = require('Listing');
const array = require("array");


module.exports.system_assign_lawyer = async function(caseId){
    const Cases = await Case.findById(caseId);
    const st = await Staff.find({ Type: "Lawyer" },{number_of_cases:1});
    
    
    var least = st[0].number_of_cases;
    for (let i=1 ;i<st.length;i+=1){
        if (st[i].number_of_cases<least){
            least=st[i].number_of_cases;
        }
    }
    for (let i=0 ;i<st.length;i+=1){
        if (st[i].number_of_cases===least){
            
            fun.admin_assign_lawyer(caseId,st[i]._id)
            break
        }
    }
}

module.exports.system_assign_reviewer = async function(caseId){
    const st = await Staff.find({ Type: "Reviewer" },{number_of_cases:1});
    
    
    var least = st[0].number_of_cases;
    for (let i=1 ;i<st.length;i+=1){
        if (st[i].number_of_cases<least){
            least=st[i].number_of_cases;
        }
    }
    for (let i=0 ;i<st.length;i+=1){
        if (st[i].number_of_cases===least){
            fun.admin_assign_reviewer(caseId,st[i]._id)
            break
        }
    }
}



module.exports.track = async function(id){
    const Cases = await Case.findById(id);
    var x = Cases.caseStatus
    return x
}

module.exports.admin_assign_lawyer = async function(caseId,lawyerId){
    const updatedCase = await Case.findByIdAndUpdate(caseId, {"lawyerID":lawyerId})
    const st = await Staff.findById(lawyerId);
    const updatedLawyer1 = await Staff.findByIdAndUpdate(lawyerId, {"total_number_of_cases":st.total_number_of_cases+1})
    const updatedLawyer2 = await Staff.findByIdAndUpdate(lawyerId, {"number_of_cases":st.number_of_cases+1})
}


module.exports.admin_assign_reviewer = async function(caseId,reviewerId){
    const updatedCase = await Case.findByIdAndUpdate(caseId, {"reviewerID":reviewerId})
    const st = await Staff.findById(reviewerId);
    const updatedLawyer1 = await Staff.findByIdAndUpdate(reviewerId, {"total_number_of_cases":st.total_number_of_cases+1})
    const updatedLawyer2 = await Staff.findByIdAndUpdate(reviewerId, {"number_of_cases":st.number_of_cases+1})

}




module.exports.calc_fees = async function(id) {
    const Cases = await Case.findById(id);
    var status = Cases.caseStatus
    if (status==="Lawyer"){
        var type = Cases.regulated_law;
        if (type==="Law 159"){
            var x =   Cases.equality_capital
            var gafi = .001*x;
            var notary = .0025*x;
            if (gafi<100){
                gafi=100;
            }
            if (gafi>1000){
                gafi=1000;
            }
            if (notary<10){
                notary=10;
            }
            if (notary>1000){
                notary=1000;
            }
            var fee=global.revenues159 +global.debt159 +gafi + notary;
            const updatedCase = await Case.findByIdAndUpdate(id, {"fees":fee})
        }
        if (type==="Law 72"){
            var fee = global.revenues72 +global.debt72 
            const updatedCase = await Case.findByIdAndUpdate(id, {"fees":fee})
        }
    }
    
};


