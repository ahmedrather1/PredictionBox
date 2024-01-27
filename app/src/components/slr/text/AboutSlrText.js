import React from "react";

const AboutSlrText = () => {
  return (
    <p>
      Simple linear regression is a fundamental statistical technique used to
      understand the relationship between two variables. Imagine you have two
      sets of data, and you want to explore how changes in one set (let's call
      it the "predictor") might affect the other set (the "response"). Simple
      linear regression helps you find a straight-line relationship between
      these two sets of data.
      <br />
      <br /> For example, you might want to see how the number of hours studied
      affects exam scores. In this scenario, the number of study hours is the
      independent variable, and the exam scores are the dependent variable.
      Simple linear regression will help you understand if more study hours
      generally lead to higher exam scores, and if so, how much of an increase
      in scores you might expect for each additional hour of study.
      <br />
      <br /> In this simulator, you have the option to either use demo data or
      upload your own data for analysis. If you choose to upload your data,
      please ensure it is in a CSV (Comma-Separated Values) file format. This
      file should consist of columns with only numeric data. If any of your
      columns contain non-numeric data, such as text or dates, these columns
      will be ignored in the analysis. This is because our linear regression
      model can only interpret and process numerical values. By ensuring your
      data is properly formatted, you'll get the most accurate and meaningful
      results from the simulation.
      <br />
    </p>
  );
};

export default AboutSlrText;
