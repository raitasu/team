import{bd as y,be as o}from"./index-b52e60c4.js";const p=y.injectEndpoints({overrideExisting:!1,endpoints:i=>({getCV:i.query({providesTags:e=>[{type:o.CVs,id:e?e.id:"ENTITY"},{type:o.CV,id:e?e.id:"ENTITY"}],query:({employeeId:e,cvId:t})=>({url:`/employees/${e}/cvs/${t}`,method:"GET"})}),createCV:i.mutation({invalidatesTags:(e,t,s)=>[{type:o.CVs,id:e!==void 0?`${e}`:"ENTITY"},{type:o.CVs,id:`${s.employeeId?s.employeeId:"LIST"}`}],query:({employeeId:e,name:t})=>({url:`/employees/${e}/cvs`,method:"POST",body:{name:t}})}),saveCV:i.mutation({invalidatesTags:(e,t,s)=>[{type:o.CVs,id:e!==void 0?`${e}`:"ENTITY"},{type:o.CVs,id:`${s.employeeId?s.employeeId:"LIST"}`},{type:o.CV,id:`${s.cvId?s.cvId:"ENTITY"}`}],query:({employeeId:e,cvId:t,cv:s})=>({url:`/employees/${e}/cvs/${t}`,method:"PATCH",body:s})}),getCVsList:i.query({providesTags:(e,t,s)=>[{type:o.CVs,id:s.employeeId?s.employeeId:"LIST"},...(e||[]).map(d=>({type:o.CVs,id:d.id}))],query:({employeeId:e})=>({url:`/employees/${e}/cvs`,method:"GET"})}),deleteCV:i.mutation({invalidatesTags:(e,t,s)=>[{type:o.CVs,id:"LIST"},{type:o.CVs,id:s.employeeId}],query:({employeeId:e,cvId:t})=>({url:`employees/${e}/cvs/${t}`,method:"DELETE"})})})}),{useGetCVsListQuery:a,useDeleteCVMutation:T,useCreateCVMutation:C,useSaveCVMutation:m,useGetCVQuery:u}=p;export{T as a,u as b,a as c,C as d,m as u};
