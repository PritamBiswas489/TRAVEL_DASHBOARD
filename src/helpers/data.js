import { appointmentsData, brandListData, customersData, dataTableRecords, departmentData, doctorListData, doctorsData, filesData, invoicesData, patientsData, paymentData, reviewData, sellersData, socialUserData, transactionData, userData } from "@/assets/data/other";
import { orderData, productData } from "@/assets/data/products";
import { emailsData } from "@/assets/data/social";
import { sleep } from "@/utils/promise";
export const getProducts = async () => {
  await sleep();
  return productData;
};
export const getBrandsList = async () => {
  await sleep();
  return brandListData;
};
export const getAllUsers = async () => {
  return userData;
};
export const getAllDoctors = async () => {
  await sleep();
  return doctorsData;
};
export const getAllDoctorList = async () => {
  await sleep();
  return doctorListData;
};
export const getAllSellers = async () => {
  await sleep();
  return sellersData;
};
export const getAllDepartments = async () => {
  await sleep();
  return departmentData;
};
export const getAllDataTableRecords = async () => {
  await sleep();
  return dataTableRecords;
};
export const getAllTransaction = async () => {
  await sleep();
  return transactionData;
};
export const getAllEmails = async () => {
  await sleep();
  return emailsData;
};
export const getAllAppointment = async () => {
  const data = appointmentsData.map(item => {
    const doctors = doctorsData.find(doctor => doctor.id === item.doctorsId);
    return {
      ...item,
      doctors
    };
  });
  await sleep();
  return data;
};
export const getUserById = async id => {
  const user = userData.find(user => user.id === id);
  if (user) {
    await sleep();
    return user;
  }
};
export const getAllFiles = async () => {
  const data = filesData.map(item => {
    const user = socialUserData.find(user => user.id == item.userId);
    return {
      ...item,
      user
    };
  });
  await sleep();
  return data;
};
export const getAllPatients = async () => {
  const data = patientsData.map(item => {
    const user = socialUserData.find(user => user.id == item.userId);
    return {
      ...item,
      user
    };
  });
  await sleep();
  return data;
};
export const getAllOrders = async () => {
  const data = orderData.map(item => {
    const users = socialUserData.find(user => user.id == item.userId);
    return {
      ...item,
      users
    };
  });
  await sleep();
  return data;
};
export const getAllCustomers = async () => {
  const data = customersData.map(item => {
    const users = socialUserData.find(user => user.id == item.userId);
    return {
      ...item,
      users
    };
  });
  await sleep();
  return data;
};
export const getAllPayments = async () => {
  const data = paymentData.map(item => {
    const user = socialUserData.find(product => product.id === item.userId);
    const doctors = doctorsData.find(doctor => doctor.id === item.doctorsId);
    return {
      ...item,
      user,
      doctors
    };
  });
  await sleep();
  return data;
};
export const getAllInvoices = async () => {
  const data = invoicesData.map(item => {
    const users = socialUserData.find(product => product.id === item.userId);
    const products = productData.find(product => product.id === item.productId);
    return {
      ...item,
      users,
      products
    };
  });
  await sleep();
  return data;
};
export const getAllReviews = async () => {
  const data = reviewData.map(item => {
    const doctors = doctorListData.find(doctor => doctor.id == item.doctorsId);
    return {
      ...item,
      doctors
    };
  });
  await sleep();
  return data;
};