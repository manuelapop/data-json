using DisplayData.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using Xunit;

namespace tests_api
{
    public class DataControllerTest
    {
        DataController _controller;

        public DataControllerTest()
        {
            _controller = new DataController();
        }

        [Fact]
        public void Get_WhenCalled_ReturnsOkResult()
        {
            var type = "posts";
            // Act
            var okResult = _controller.GetData(type);

            // Assert
            Assert.IsType<OkObjectResult>(okResult.Result);
        }

        [Fact]
        public void Get_WhenCalled_ReturnsAllItems()
        {
            var type = "posts";
            // Act
            var okResult = _controller.GetData(type).Result as OkObjectResult;
            var posts = JArray.Parse(okResult.Value.ToString());

            // Assert
            Assert.Equal(100, posts.Count);
        }
    }
}
