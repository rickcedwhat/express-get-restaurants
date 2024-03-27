/*
Create tests that accomplish the following:

Verify that the GET /restaurants route returns a status code of 200.
Verify that GET /restaurants route returns an array of restaurants
Test that GET /restaurants returns the correct number of restaurants
Test that GET /restaurants returns the correct restaurant data
Verify that GET /restaurants/:id request returns the correct data.
Test that POST /restaurants request returns the restaurants array has been updated with the new value.
Verify that PUT /restaurants/:id request updates the restaurant array with the provided value
Test that DELETE /restaurant/:id deletes the restaurant with the provided id from the array.
*/

describe("GET /restaurants", () => {
  let response;
  beforeAll(async () => {
    response = await request(app).get("/restaurants");
  });
  it("returns status code 200", async () => {
    expect(response.statusCode).toBe(200);
  });
  it("returns an array of restaurants", async () => {
    expect(response.body).toBeInstanceOf(Array);
  });
  it("returns the correct number of restaurants", async () => {
    expect(response.body.length).toBe(3);
  });
  it("returns the correct restaurant data", async () => {
    const restaurant = response.body[0];
    expect(restaurant.name).toBe("AppleBees");
    expect(restaurant.location).toBe("Texas");
    expect(restaurant.cuisine).toBe("FastFood");
  });
  describe("GET /restaurants/:id", () => {
    let response;
    beforeAll(async () => {
      response = await request(app).get("/restaurants/1");
    });
    it("returns status code 200", async () => {
      expect(response.statusCode).toBe(200);
    });
    it("returns the correct restaurant data", async () => {
      const restaurant = response.body;
      expect(restaurant.name).toBe("AppleBees");
      expect(restaurant.location).toBe("Texas");
      expect(restaurant.cuisine).toBe("FastFood");
    });
  })
  describe("POST /restaurants", () => {
    let response;
    beforeAll(async () => {
      response = await request(app).post("/restaurants").send({
        name: "Senor M",
        location: "Seattle",
        cuisine: "Mexican"
      });
    });
    it("returns status code 200", async () => {
      expect(response.statusCode).toBe(200);
    });
    it("returns the updated array of restaurants", async () => {
      expect(response.body).toBeInstanceOf(Array);
    });
    it("returns the correct number of restaurants", async () => {
      expect(response.body.length).toBe(4);
    });
    it("returns the correct restaurant data", async () => {
      const restaurant = response.body[3];
      expect(restaurant.name).toBe("LittleSheep");
  })
});
